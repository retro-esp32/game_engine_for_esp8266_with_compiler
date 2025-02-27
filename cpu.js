"use strict";

var timers = [];
// SH
var sProc = document.title;

var iW = 128;
var iH = 128
var iX = 0;
var iX2 = 0;

sProc = sProc.substring(0,5);

if (sProc === "esp32") {
	iW = 320;
	iH = 240;
	iX = 80;
	iX2 = iX / 2;
}

function Cpu() {
	var mem = []; //memory, maximum 65,534 bytes
	var reg = []; //16 registers, null used as stack pointer
	var regx = 0; //implicit case, indicates the X position of the character in text mode
	var regy = 0; //Y symbol position
	var imageSize = 1; //affects the size factor of the displayed image, does not apply to sprites
	var pc = 0; //pointer to the current command
	var carry = 0; //overflow flag
	var zero = 0; //zero flag
	var negative = 0; //negative flag
	var interrupt = 0; //interrupt flag
	var redraw = 0; //flag, set after redrawing
	var sprites = []; //array of sprite addresses and coordinates
	var particles = []; //particle array
	var maxParticles = 32; //maximum number of particles
	var emitter = []; //particle settings
	var tile = []; //settings for drawing tiles
	var bgcolor = 0; //background colour
	var color = 1; //foreground colour
	var charArray = []; //array of characters to display
	var interruptBuffer = [];
	var keyPosition = 0;
	var keyArray = "qwertyuiop[]{}()=789\basdfghjkl:;\"/#$@0456\nzxcvbnm<>?.,!%+*-123 ";
	var dataName = 0;
	
	function init() {
		for (var i = 0; i < 0xffff; i++)
			mem[i] = 0;
		for (var i = 1; i < 16; i++)
			reg[i] = 0;
		//specify the last memory cell for the stack, if the memory is less then the value changes accordingly
		reg[0] = 0xffff;
		pc = 0;
		regx = 0;
		regy = 0;
		imageSize = 1;
		bgcolor = 0;
		color = 1;
		interrupt = 0;
		//set the initial coordinates of sprites outside the borders of the screen
		for (var i = 0; i < 32; i++) {
			sprites[i] = {
				address: 0,
// SH
				x: (iW - iX) * 2 - 1,
				y: iH * 2 - 1,
				speedx: 0,
				speedy: 0,
				height: 8,
				width: 8,
				angle: 0,
				isonebit: 0,
				lives: 0,
				collision: -1,
				solid: 0,
				gravity: 0,
				oncollision: 0,
				onexitscreen: 0,
				isscrolled: 1,
				fliphorizontal: 0
			};
		}
		for (var i = 0; i < maxParticles; i++) {
			particles[i] = {
				time: 0,
				x: 0,
				y: 0,
				gravity: 0,
				speedx: 0,
				speedy: 0,
				color: 0
			};
		}
		emitter = {
			time: 0,
			timer: 0,
			timeparticle: 0,
			count: 0,
			x: 0,
			y: 0,
			gravity: 0,
			speedx: 0,
			speedy: 0,
			speedx1: 0,
			speedy1: 0,
			color: 0
		};
		tile = {
			adr: 0,
			imgwidth: 0,
			imgheight: 0,
			width: 0,
			height: 0,
			x: 0,
			y: 0
		};
		for (var i = 0; i < 420; i++)
			charArray[i] = '';
		for (var i = 0; i < 8; i++)
			timers[i] = 0;
	}
	//program download
	function load(arr) {
		for (var i = 0; i < arr.length; i++)
			mem[i] = arr[i];
	}

	function writeInt(adr, n) {
		writeMem(adr + 1, (n & 0xff00) >> 8);
		writeMem(adr, n & 0xff);
	}

	function readInt(adr) {
		return (readMem(adr + 1) << 8) + readMem(adr);
	}

	function writeMem(adr, n) {
		mem[adr & 0xffff] = n & 0xff;
	}

	function readMem(adr) {
		return mem[adr & 0xffff];
	}

	function setRedraw() {
		redraw = 1;
	}

	function setFlags(n) {
		carry = (n > 0xffff) ? 1 : 0;
		zero = (n == 0) ? 1 : 0;
		negative = ((n & 0xffff) > 0x7fff) ? 1 : 0;
		n = n & 0xffff;
		return n;
	}

	function setFlagsC(n) {
		carry = 0;
		zero = 0;
		negative = 0;
		if (n > 0xff) {
			carry = 1;
		}
		if (n == 0) {
			zero = 1;
		} else if (n < 0) {
			negative = 1;
		}
		n = n & 0xff;
		return n;
	}

	function setSprite(n, adr) {
		sprites[n].address = adr;
	}

	function angleBetweenSprites(n1, n2) {
		var A = Math.floor(Math.atan2(sprites[n1].y - sprites[n2].y, sprites[n1].x - sprites[n2].x) * 57.4);
		A = (A < 0) ? A + 360 : A;
		return A;
	}

	function fillRect(x, y, w, h, c) {
		for (var jx = x; jx < x + w; jx++)
			for (var jy = y; jy < y + h; jy++)
				display.plot(c, jx, jy);
	}

	function scrollScreen(step, direction) {
		var bufPixel,
		n;
		if (direction == 2) {
// SH -- LEFT
			for (var y = 0; y < iH; y++) {
				bufPixel = display.getPixel(0, y);
				for (var x = 1; x < (iW - iX); x++)
					display.plot(display.getPixel(x, y), x - 1, y);
				display.plot(bufPixel, (iW - iX) - 1, y);
			}

			for (n = 0; n < 32; n++)
				if (sprites[n].isscrolled != 0)
					sprites[n].x -= 4;
		} else if (direction == 1) {
// SH -- UP
			for (var x = 0; x < (iW - iX); x++) {
				bufPixel = display.getPixel(x, 0);
				for (var y = 1; y < iH; y++)
					display.plot(display.getPixel(x, y), x, y - 1);
				display.plot(bufPixel, x, iH - 1);
			}

			for (n = 0; n < 32; n++)
				if (sprites[n].isscrolled != 0)
					sprites[n].y -= 4;
		} else if (direction == 0) {
// SH -- RIGHT
			for (var y = 0; y < iH; y++) {
				bufPixel = display.getPixel((iW - iX) - 1, y);
				for (var x = (iW - iX) - 1; x > 0; x--)
					display.plot(display.getPixel(x - 1, y), x, y);
				display.plot(bufPixel, 0, y);
			}

			for (n = 0; n < 32; n++)
				if (sprites[n].isscrolled != 0)
					sprites[n].x += 4;
		} else {
// SH -- DOWN
			for (var x = 0; x < (iW - iX); x++) {
				bufPixel = display.getPixel(x, iH - 1);
				for (var y = iH - 1; y > 0; y--)
					display.plot(display.getPixel(x, y - 1), x, y);
				display.plot(bufPixel, x, 0);
			}

			for (n = 0; n < 32; n++)
				if (sprites[n].isscrolled != 0)
					sprites[n].y += 4;
		}
		if (tile.adr > 0)
			tileDrawLine(step, direction);
	}

	function tileDrawLine(step, direction) {
		var x,
		y,
		x0,
		y0,
		y1,
		imgadr;
		if (direction == 2) {
			tile.x -= step;
			x0 = tile.x;
			y0 = tile.y;
// SH
			x = Math.floor(((iW - iX) - 1 - x0) / tile.imgwidth);

			if (x < tile.width && x >= 0) {
				for (y = 0; y < tile.height; y++) {
// SH
					if (y0 + y * tile.imgheight > 0 && y0 + y * tile.imgheight < iH) {
						imgadr = readInt(tile.adr + (x + y * tile.width) * 2);
						if (imgadr > 0)
							drawImage(imgadr, x0 + x * tile.imgwidth, y0 + y * tile.imgheight, tile.imgwidth, tile.imgheight);
						else
							fillRect(x0 + x * tile.imgwidth, y0 + y * tile.imgheight, tile.imgwidth, tile.imgheight, bgcolor);
					}
				}
			} else if (tile.width * tile.imgwidth + x0 >= 0) {
				y0 = (y0 > 0) ? y0 : 0;
// SH
				y1 = (tile.y + tile.height * tile.imgheight < iH) ? tile.y + tile.height * tile.imgheight - y0 : iH - 1 - y0;
				if (y0 < iH - 1 && y1 > 0)
					fillRect((iW - iX) - 1 - step, y0, step, y1, bgcolor);
			}
		} else if (direction == 1) {
			tile.y -= step;
			x0 = tile.x;
			y0 = tile.y;
// SH
			y = Math.floor((iH - 1 - y0) / tile.imgheight);

			if (y < tile.height && y >= 0)
				for (x = 0; x < tile.width; x++) {
// SH
					if (x0 + x * tile.imgwidth > 0 && x0 + x * tile.imgwidth < (iW - iX)) {
						imgadr = readInt(tile.adr + (x + y * tile.width) * 2);
						if (imgadr > 0)
							drawImage(imgadr, x0 + x * tile.imgwidth, y0 + y * tile.imgheight, tile.imgwidth, tile.imgheight);
						else
							fillRect(x0 + x * tile.imgwidth, y0 + y * tile.imgheight, tile.imgwidth, tile.imgheight, bgcolor);
					}
				}
		} else if (direction == 0) {
			tile.x += step;
			x0 = tile.x;
			y0 = tile.y;
			x = Math.floor((0 - x0) / tile.imgwidth);
			if (x0 < 0 && x >= 0) {
				for (y = 0; y < tile.height; y++) {
// SH
					if (y0 + y * tile.imgheight > 0 && y0 + y * tile.imgheight < iH) {
						imgadr = readInt(tile.adr + (x + y * tile.width) * 2);
						if (imgadr > 0)
							drawImage(imgadr, x0 + x * tile.imgwidth, y0 + y * tile.imgheight, tile.imgwidth, tile.imgheight);
						else
							fillRect(x0 + x * tile.imgwidth, y0 + y * tile.imgheight, tile.imgwidth, tile.imgheight, bgcolor);
					}
				}
// SH
			} else if (x0 < (iW - iX)) {
				y0 = (y0 > 0) ? y0 : 0;
				y1 = (tile.y + tile.height * tile.imgheight < iH) ? tile.y + tile.height * tile.imgheight - y0 : iH - 1 - y0;
				if (y0 < iH - 1 && y1 > 0)
					fillRect(0, y0, step, y1, bgcolor);
			}
		} else if (direction == 3) {
			tile.y += step;
			x0 = tile.x;
			y0 = tile.y;
			y = Math.floor((0 - y0) / tile.imgheight);
			if (y >= 0)
				for (x = 0; x < tile.width; x++) {
// SH
					if (x0 + x * tile.imgwidth > 0 && x0 + x * tile.imgwidth < (iW - iX)) {
						imgadr = readInt(tile.adr + (x + y * tile.width) * 2);
						if (imgadr > 0)
							drawImage(imgadr, x0 + x * tile.imgwidth, y0 + y * tile.imgheight, tile.imgwidth, tile.imgheight);
						else
							fillRect(x0 + x * tile.imgwidth, y0 + y * tile.imgheight, tile.imgwidth, tile.imgheight, bgcolor);
					}
				}
		}
	}

	function drawSprite(n, x1, y1) {
		if (x1 > 0x7fff)
			sprites[n].x = Math.floor((x1 - 0x10000) << 2);
		else
			sprites[n].x = Math.floor(x1 << 2);
		if (y1 > 0x7fff)
			sprites[n].y = Math.floor((y1 - 0x10000) << 2);
		else
			sprites[n].y = Math.floor(y1 << 2);
	}

	function setParticle(gravity, count, time) {
		emitter.gravity = gravity;
		emitter.count = count;
		emitter.timeparticle = time;
	}

	function setEmitter(time, dir, dir1, speed) {
		speed = speed;
		emitter.time = time;
		emitter.speedx = Math.round(speed * Math.cos(dir / 57));
		emitter.speedy = Math.round(speed * Math.sin(dir / 57));
		emitter.speedx1 = Math.round(speed * Math.cos(dir1 / 57));
		emitter.speedy1 = Math.round(speed * Math.sin(dir1 / 57));
	}

	function drawParticle(x, y, color) {
		emitter.x = x << 1;
		emitter.y = y << 1;
		emitter.color = color;
		emitter.timer = emitter.time;
	}

	function randomD(a, b) {
		var min = Math.min(a, b);
		var max = Math.max(a, b);
		var rand = min - 0.5 + Math.random() * (max - min + 1)
			rand = Math.round(rand);
		return rand;
	}

	function redrawParticle() {
		var n,
		i;
		if (emitter.timer > 0) {
			emitter.timer -= 50;
			i = emitter.count;
			for (var n = 0; n < maxParticles; n++) {
				if (i == 0)
					break;
				if (particles[n].time <= 0) {
					i--;
					particles[n].time = emitter.timeparticle;
					particles[n].x = emitter.x;
					particles[n].y = emitter.y;
					particles[n].color = emitter.color;
					particles[n].speedx = randomD(emitter.speedx, emitter.speedx1);
					particles[n].speedy = randomD(emitter.speedy, emitter.speedy1);
					particles[n].gravity = emitter.gravity;
				}
			}
		}
		for (n = 0; n < maxParticles; n++)
			if (particles[n].time > 0) {
				display.drawSpritePixel(particles[n].color, Math.floor(particles[n].x >> 1), Math.floor(particles[n].y >> 1));
				particles[n].time -= 50;
				if (randomD(0, 1) == 1) {
					particles[n].x += particles[n].speedx;
					particles[n].speedy += particles[n].gravity;
					particles[n].y += particles[n].speedy;
				} else {
					particles[n].x += Math.floor(particles[n].speedx / 2);
					particles[n].y += Math.floor(particles[n].speedy / 2);
				}
// SH
				if (particles[n].x < 0 || particles[n].x > (iW - iX + iX2) || particles[n].y < 0 || particles[n].y > iH)
					particles[n].time = 0;
			}
	}

	function loadTile(adr, iwidth, iheight, width, height) {
		tile.adr = adr;
		tile.imgwidth = iwidth;
		tile.imgheight = iheight;
		tile.width = width;
		tile.height = height;
	}

	function spriteSetDirectionAndSpeed(n, speed, direction) {
		if (speed > 0x7fff)
			speed -= 0xffff;
		if (direction > 0x7fff) {
			direction = 360 + direction % 360;
		}
		var nx = speed * Math.cos(direction / 57);
		var ny = speed * Math.sin(direction / 57);
		sprites[n].speedx = Math.floor(nx);
		sprites[n].speedy = Math.floor(ny);
	}

	function drawRotateSprPixel(color, x1, y1, x, y, w, h, a) {
		var x0 = w / 2;
		var y0 = h / 2;
		var nx = x0 + (x - x0) * Math.cos(a) - (y - y0) * Math.sin(a);
		var ny = y0 + (y - y0) * Math.cos(a) + (x - x0) * Math.sin(a);
		display.drawSpritePixel(color, x1 + Math.floor(nx), y1 + Math.floor(ny));
	}

	function redrawSprite() {
		var clr,
		n,
		i;
		for (n = 0; n < 32; n++) {
			if (sprites[n].lives > 0) {
				var adr = sprites[n].address;
				var x1 = Math.floor(sprites[n].x >> 2);
				var y1 = Math.floor(sprites[n].y >> 2);
				if (sprites[n].isonebit == 0) {
					for (var y = 0; y < sprites[n].height; y++)
						for (var x = 0; x < sprites[n].width; x++) {
							clr = (readMem(adr) & 0xf0) >> 4;
							if (clr > 0) {
								if (sprites[n].fliphorizontal)
									drawRotateSprPixel(clr, x1, y1, sprites[n].width - x, y, sprites[n].width, sprites[n].height, sprites[n].angle / 57);
								else
									drawRotateSprPixel(clr, x1, y1, x, y, sprites[n].width, sprites[n].height, sprites[n].angle / 57);
							}
							x++;
							clr = (readMem(adr) & 0xf);
							if (clr > 0)
								if (sprites[n].fliphorizontal)
									drawRotateSprPixel(clr, x1, y1, sprites[n].width - x, y, sprites[n].width, sprites[n].height, sprites[n].angle / 57);
								else
									drawRotateSprPixel(clr, x1, y1, x, y, sprites[n].width, sprites[n].height, sprites[n].angle / 57);
							adr++;
						}
				} else {
					i = 0;
					var ibit;
					for (var y = 0; y < sprites[n].height; y++)
						for (var x = 0; x < sprites[n].width; x++) {
							if (i % 8 == 0) {
								ibit = readMem(adr);
								adr++;
							}
// SH -- &
							if (ibit & (iW - iX))
								if (sprites[n].fliphorizontal)
									drawRotateSprPixel(color, x1, y1, sprites[n].width - x, y, sprites[n].width, sprites[n].height, sprites[n].angle / 57);
								else
									drawRotateSprPixel(color, x1, y1, x, y, sprites[n].width, sprites[n].height, sprites[n].angle / 57);
							ibit = ibit << 1;
							i++;
						}
				}
				sprites[n].speedy += sprites[n].gravity;
				sprites[n].x += sprites[n].speedx;
				sprites[n].y += sprites[n].speedy;
				if (sprites[n].onexitscreen > 0) {
// SH
					if ((sprites[n].x >> 2) + sprites[n].width < 0 || (sprites[n].x >> 2) > (iW - iX + iX2 - 1)
						 || (sprites[n].y >> 2) + sprites[n].height < 0 || (sprites[n].y >> 2) > iH - 1)
						setinterrupt(sprites[n].onexitscreen, n);
				}
			}
		}
	}

	function flagsToByte() {
		return (carry & 0x1) + ((zero & 0x1) << 1) + ((negative & 0x1) << 2);
	}

	function byteToFlags(b) {
		carry = b & 0x1;
		zero = (b & 0x2) >> 1;
		negative = (b & 0x4) >> 2;
	}

	function setinterrupt(adr, param) {
		if (interrupt == 0) {
			reg[0] -= 2;
			writeInt(reg[0], flagsToByte());
			for (var j = 1; j <= 15; j++) {
				reg[0] -= 2;
				writeInt(reg[0], reg[j]);
			}
			reg[0] -= 2;
			writeInt(reg[0], param);
			reg[0] -= 2;
			writeInt(reg[0], pc);
			interrupt = pc;
			pc = adr;
		} else if (interruptBuffer.length < 10) {
			interruptBuffer.push(param);
			interruptBuffer.push(adr);
		}
	}

	function getSpriteInXY(x, y) {
		if (x > 0x7fff)
			x -= 0xffff;
		if (y > 0x7fff)
			y -= 0xffff;
		x = Math.floor(x << 2);
		y = Math.floor(y << 2);
		for (var n = 0; n < 32; n++) {
			if (sprites[n].lives > 0)
				if (sprites[n].x < x && sprites[n].x + (sprites[n].width << 2) > x &&
					sprites[n].y < y && sprites[n].y + (sprites[n].height << 2) > y)
					return n;
		}
		return  - 1;
	}

	function resolveCollision(n, i) {
		var startx,
		starty,
		startix,
		startiy;
		startx = sprites[n].x;
		starty = sprites[n].y;
		startix = sprites[i].x;
		startiy = sprites[i].y;
		sprites[n].x = sprites[n].x - sprites[n].speedx;
		sprites[n].y = sprites[n].y - sprites[n].speedy;
		sprites[i].x = sprites[i].x - sprites[i].speedx;
		sprites[i].y = sprites[i].y - sprites[i].speedy;
		if ((sprites[n].speedy >= 0 && sprites[i].speedy <= 0) || (sprites[n].speedy <= 0 && sprites[i].speedy >= 0)) {
			if (sprites[n].y > sprites[i].y) {
				if (sprites[i].gravity > 0) {
					sprites[i].y = sprites[n].y - (sprites[i].height << 2);
				}
			} else {
				if (sprites[n].gravity > 0) {
					sprites[n].y = sprites[i].y - (sprites[n].height << 2);
				}
			}
		}
		if (sprites[n].x < sprites[i].x + (sprites[i].width << 2) &&
			sprites[n].x + (sprites[n].width << 2) > sprites[i].x &&
			sprites[n].y < sprites[i].y + (sprites[i].height << 2) &&
			sprites[n].y + (sprites[n].height << 2) > sprites[i].y) {
			if (sprites[n].x > sprites[i].x) {
				sprites[n].x++;
				sprites[i].x--;
			} else {
				sprites[n].x--;
				sprites[i].x++;
			}
			if (sprites[n].y > sprites[i].y) {
				sprites[n].y++;
				sprites[i].y--;
			} else {
				sprites[n].y--;
				sprites[i].y++;
			}
		}
		if (sprites[n].gravity != 0) {
			sprites[n].speedx = Math.floor((sprites[n].x - startx) / 4);
			sprites[n].speedy = Math.floor((sprites[n].y - starty) / 4);
		} else {
			sprites[n].speedx = Math.floor((sprites[n].x - startx));
			sprites[n].speedy = Math.floor((sprites[n].y - starty));
		}
		if (sprites[i].gravity != 0) {
			sprites[i].speedx = Math.floor((sprites[i].x - startix) / 4);
			sprites[i].speedy = Math.floor((sprites[i].y - startiy) / 4);
		} else {
			sprites[i].speedx = Math.floor((sprites[i].x - startix));
			sprites[i].speedy = Math.floor((sprites[i].y - startiy));
		}
	}

	function testSpriteCollision(debug) {
		var n,
		i,
		x0,
		y0,
		adr;
		for (n = 0; n < 32; n++)
			sprites[n].collision = (-1) & 0xffff;
		for (n = 0; n < 32; n++) {
			if (sprites[n].lives > 0) {
				for (i = 0; i < n; i++) {
					if (sprites[i].lives > 0)
						if (sprites[n].x < sprites[i].x + (sprites[i].width << 2) &&
							sprites[n].x + (sprites[n].width << 2) > sprites[i].x &&
							sprites[n].y < sprites[i].y + (sprites[i].height << 2) &&
							sprites[n].y + (sprites[n].height << 2) > sprites[i].y) {
							sprites[n].collision = i;
							sprites[i].collision = n;
							if (sprites[n].oncollision > 0)
								setinterrupt(sprites[n].oncollision, n);
							if (sprites[i].oncollision > 0)
								setinterrupt(sprites[i].oncollision, i);
							if (debug) {
								display.drawTestRect(sprites[n].x >> 2, sprites[n].y >> 2, sprites[n].width, sprites[n].height, sprites[n].solid);
								display.drawTestRect(sprites[i].x >> 2, sprites[i].y >> 2, sprites[i].width, sprites[i].height, sprites[i].solid);
							}
							if (sprites[n].solid != 0 && sprites[i].solid != 0) {
								resolveCollision(n, i);
							}
						}
				}
				if (sprites[n].solid != 0) {
					x0 = Math.floor((Math.floor(sprites[n].x >> 2) + sprites[n].width / 2 - tile.x) / tile.imgwidth);
					y0 = Math.floor((Math.floor(sprites[n].y >> 2) + sprites[n].height / 2 - tile.y) / tile.imgheight);
					if (x0 >= -1 && x0 <= tile.width && y0 >= -1 && y0 <= tile.height) {
						if (debug) {
							display.drawTestRect(tile.x + x0 * tile.imgwidth, tile.y + y0 * tile.imgheight, tile.imgwidth, tile.imgheight, getTile(x0, y0));
							display.drawTestRect(tile.x + (x0 - 1) * tile.imgwidth, tile.y + y0 * tile.imgheight, tile.imgwidth, tile.imgheight, getTile(x0 - 1, y0));
							display.drawTestRect(tile.x + (x0 + 1) * tile.imgwidth, tile.y + y0 * tile.imgheight, tile.imgwidth, tile.imgheight, getTile(x0 + 1, y0));
							display.drawTestRect(tile.x + x0 * tile.imgwidth, tile.y + (y0 - 1) * tile.imgheight, tile.imgwidth, tile.imgheight, getTile(x0, y0 - 1));
							display.drawTestRect(tile.x + x0 * tile.imgwidth, tile.y + (y0 + 1) * tile.imgheight, tile.imgwidth, tile.imgheight, getTile(x0, y0 + 1));
						}
						x0 = Math.floor(sprites[n].x >> 2);
						y0 = Math.floor(sprites[n].y >> 2);
						if (getTileInXY(x0, y0) || getTileInXY(x0 + sprites[n].width, y0)
							 || getTileInXY(x0, y0 + sprites[n].height) || getTileInXY(x0 + sprites[n].width, y0 + sprites[n].height)) {
							sprites[n].y = sprites[n].y - sprites[n].speedy;
							y0 = Math.floor(sprites[n].y >> 2);
							if (getTileInXY(x0, y0) || getTileInXY(x0 + sprites[n].width, y0)
								 || getTileInXY(x0, y0 + sprites[n].height)
								 || getTileInXY(x0 + sprites[n].width, y0 + sprites[n].height)) {
								sprites[n].x = sprites[n].x - sprites[n].speedx;
								//sprites[n].speedx = Math.floor((sprites[n].x - (sprites[n].x - sprites[n].speedx)) / 2);
							}
							sprites[n].speedy = Math.floor(sprites[n].speedy / 2 - sprites[n].gravity);
							sprites[n].speedx = Math.floor(sprites[n].speedx / 2);
							x0 = Math.floor(sprites[n].x >> 2);
							y0 = Math.floor(sprites[n].y >> 2);
							if (getTileInXY(x0, y0 + sprites[n].height)
								 || getTileInXY(x0 + sprites[n].width, y0 + sprites[n].height)) {
								sprites[n].y--;
							}
						}
					}
				}
			}
		}
	}

	function getTileInXY(x, y) {
		if (x > 0x7fff)
			x -= 0xffff;
		if (y > 0x7fff)
			y -= 0xffff;
		if (x < tile.x || y < tile.y || x > tile.x + tile.imgwidth * tile.width || y > tile.y + tile.imgheight * tile.height)
			return 0;
		var p = (Math.floor((x - tile.x) / tile.imgwidth) + Math.floor((y - tile.y) / tile.imgheight) * tile.width);
		var t = readInt(tile.adr + p * 2);
		return t;
	}

	function getTile(x, y) {
		if (x < 0 || x >= tile.width || y < 0 || y >= tile.height)
			return 0;
		return readInt(tile.adr + (x + y * tile.width) * 2);
	}

	function drawTile(x0, y0) {
		if (x0 > 0x7fff)
			x0 -= 0xffff;
		if (y0 > 0x7fff)
			y0 -= 0xffff;
		var x,
		y,
		imgadr;
		tile.x = x0;
		tile.y = y0;
		for (x = 0; x < tile.width; x++) {
			for (y = 0; y < tile.height; y++) {
// SH
				if (x0 + x * tile.imgwidth >= -tile.imgwidth && x0 + x * tile.imgwidth < (iW - iX) && y0 + y * tile.imgheight >= -tile.imgheight && y0 + y * tile.imgheight < iH) {
					imgadr = readInt(tile.adr + (x + y * tile.width) * 2);
					if (imgadr > 0)
						drawImage(imgadr, x0 + x * tile.imgwidth, y0 + y * tile.imgheight, tile.imgwidth, tile.imgheight);
				}
			}
		}
	}

	function drawImage(adr, x1, y1, w, h) {
		var color;
		if (x1 > 0x7fff)
			x1 -= 0xffff;
		if (y1 > 0x7fff)
			y1 -= 0xffff;
		for (var y = 0; y < h; y++)
			for (var x = 0; x < w; x++) {
				color = (readMem(adr) & 0xf0) >> 4;
				if (color > 0)
					display.plot(color, x1 + x, y1 + y);
				x++;
				color = (readMem(adr) & 0xf);
				if (color > 0)
					display.plot(color, x1 + x, y1 + y);
				adr++;
			}
	}

	function drawImageRLE(adr, x1, y1, w, h) {
		var i = 0;
		var repeat = readMem(adr);
		adr++;
		var color1 = (readMem(adr) & 0xf0) >> 4;
		var color2 = readMem(adr) & 0xf
			if (x1 > 0x7fff)
				x1 -= 0xffff;
			if (y1 > 0x7fff)
				y1 -= 0xffff;
			while (i < w * h) {
				if (repeat > 0x81) {
					if (color1 > 0)
						display.plot(color1, x1 + i % w, y1 + Math.floor(i / w));
					if (color2 > 0)
						display.plot(color2, x1 + i % w + 1, y1 + Math.floor(i / w));
					i += 2;
					adr++;
					repeat--;
					color1 = (readMem(adr) & 0xf0) >> 4;
					color2 = readMem(adr) & 0xf;
				} else if (repeat == 0x81) {
					repeat = readMem(adr);
					adr++;
					color1 = (readMem(adr) & 0xf0) >> 4;
					color2 = readMem(adr) & 0xf;
				} else if (repeat > 0) {
					if (color1 > 0)
						display.plot(color1, x1 + i % w, y1 + Math.floor(i / w));
					if (color2 > 0)
						display.plot(color2, x1 + i % w + 1, y1 + Math.floor(i / w));
					i += 2;
					repeat--;
				} else if (repeat == 0) {
					adr++;
					repeat = readMem(adr);
					adr++;
					color1 = (readMem(adr) & 0xf0) >> 4;
					color2 = readMem(adr) & 0xf;
				}
			}
	}
	//drawing a single bit picture
	function drawImage1bit(adr, x1, y1, w, h) {
		var size = w * h / 8;
		var i = 0;
		var bit;
		if (x1 > 0x7fff)
			x1 -= 0xffff;
		if (y1 > 0x7fff)
			y1 -= 0xffff;
		for (var y = 0; y < h; y++)
			for (var x = 0; x < w; x++) {
				if (i % 8 == 0) {
					bit = readMem(adr);
					adr++;
				}
// SH -- &
				if (bit & (iW - iX))
					display.plot(color, x1 + x, y1 + y);
				else
					display.plot(bgcolor, x1 + x, y1 + y);
				bit = bit << 1;
				i++;
			}
	}
	//picture drawing function, if its size is different from 1
	function drawImageS(adr, x1, y1, w, h) {
		var color,
		jx,
		jy;
		var s = imageSize;
		if (x1 > 0x7fff)
			x1 -= 0xffff;
		if (y1 > 0x7fff)
			y1 -= 0xffff;
		for (var y = 0; y < h; y++)
			for (var x = 0; x < w; x++) {
				color = (readMem(adr) & 0xf0) >> 4;
				if (color > 0)
					for (jx = 0; jx < s; jx++)
						for (jy = 0; jy < s; jy++)
							display.plot(color, x1 + x * s + jx, y1 + y * s + jy);
				x++;
				color = (readMem(adr) & 0xf);
				if (color > 0)
					for (jx = 0; jx < s; jx++)
						for (jy = 0; jy < s; jy++)
							display.plot(color, x1 + x * s + jx, y1 + y * s + jy);
				adr++;
			}
	}

	function drawImageRLES(adr, x1, y1, w, h) {
		var i = 0;
		var s = imageSize;
		var repeat = readMem(adr);
		adr++;
		var color1 = (readMem(adr) & 0xf0) >> 4;
		var color2 = readMem(adr) & 0xf
			if (x1 > 0x7fff)
				x1 -= 0xffff;
			if (y1 > 0x7fff)
				y1 -= 0xffff;
			while (i < w * h) {
				if (repeat > 0x81) {
					if (color1 > 0)
						display.largeplot(color1, x1 + (i % w) * s, y1 + Math.floor(i / w) * s, s);
					if (color2 > 0)
						display.largeplot(color2, x1 + (i % w) * s + s, y1 + Math.floor(i / w) * s, s);
					i += 2;
					adr++;
					repeat--;
					color1 = (readMem(adr) & 0xf0) >> 4;
					color2 = readMem(adr) & 0xf
				} else if (repeat == 0x81) {
					repeat = readMem(adr);
					adr++;
					color1 = (readMem(adr) & 0xf0) >> 4;
					color2 = readMem(adr) & 0xf
				} else if (repeat > 0) {
					if (color1 > 0)
						display.largeplot(color1, x1 + (i % w) * s, y1 + Math.floor(i / w) * s, s);
					if (color2 > 0)
						display.largeplot(color2, x1 + (i % w) * s + s, y1 + Math.floor(i / w) * s, s);
					i += 2;
					repeat--;
				} else if (repeat == 0) {
					adr++;
					repeat = readMem(adr);
					adr++;
					color1 = (readMem(adr) & 0xf0) >> 4;
					color2 = readMem(adr) & 0xf
				}
			}
	}

	function drawImage1bitS(adr, x1, y1, w, h) {
		var size = w * h / 8;
		var i = 0;
		var bit,
		jx,
		jy;
		var s = imageSize;
		if (x1 > 0x7fff)
			x1 -= 0xffff;
		if (y1 > 0x7fff)
			y1 -= 0xffff;
		for (var y = 0; y < h; y++)
			for (var x = 0; x < w; x++) {
				if (i % 8 == 0) {
					bit = readMem(adr);
					adr++;
				}
// SH -- &
				if (bit & (iW - iX)) {
					for (jx = 0; jx < s; jx++)
						for (jy = 0; jy < s; jy++)
							display.plot(color, x1 + x * s + jx, y1 + y * s + jy);
				} else {
					for (jx = 0; jx < s; jx++)
						for (jy = 0; jy < s; jy++)
							display.plot(bgcolor, x1 + x * s + jx, y1 + y * s + jy);
				}
				bit = bit << 1;
				i++;
			}
	}

	function drawFastVLine(x, y1, y2) {
		for (var i = y1; i <= y2; i++)
			display.plot(color, x, i);
	}

	function drawFastHLine(x1, x2, y) {
		for (var i = x1; i <= x2; i++)
			display.plot(color, i, y);
	}

	function drawLine(x1, y1, x2, y2) {
		if (x1 > 0x7fff)
			x1 = x1 - 0x10000;
		if (y1 > 0x7fff)
			y1 = y1 - 0x10000;
		if (x2 > 0x7fff)
			x2 = x2 - 0x10000;
		if (y2 > 0x7fff)
			y2 = y2 - 0x10000;
		if (x1 == x2) {
			if (y1 > y2)
				drawFastVLine(x1, y2, y1);
			else
				drawFastVLine(x1, y1, y2);
			return;
		} else if (y1 == y2) {
			if (x1 > x2)
				drawFastHLine(x2, x1, y1);
			else
				drawFastHLine(x1, x2, y1);
			return;
		}
		var deltaX = Math.abs(x2 - x1);
		var deltaY = Math.abs(y2 - y1);
		var signX = x1 < x2 ? 1 : -1;
		var signY = y1 < y2 ? 1 : -1;
		var error = deltaX - deltaY;
		display.plot(color, x2, y2);
		while (x1 != x2 || y1 != y2) {
			display.plot(color, x1, y1);
			var error2 = error * 2;
			if (error2 > -deltaY) {
				error -= deltaY;
				x1 += signX;
			}
			if (error2 < deltaX) {
				error += deltaX;
				y1 += signY;
			}
		}

	}

	function charLineUp(n) {
		display.reset();
		for (var i = 0; i < 420 - n * 21; i++) {
			charArray[i] = charArray[i + n * 21];
			display.char(charArray[i], (i % 21) * 6, Math.floor(i / 21) * 8, 1, 0);
		}
	}

	function printc(c, fc, bc) {
// SH
		var regXMax = 20; // 128
		var regYMax = 19; // 128
		
		if (sProc === "esp32") {
			regXMax = 37; // 240 / 128 * 20 ~= 37
			regYMax = 35; // 240 / 128 * 19 ~= 35
		}

		if (c == '\n') {
// SH
			for (var i = regx; i <= regXMax; i++) {
				display.char(' ', i * 6, regy * 8, fc, bc);
				charArray[i + regy * regXMax] = ' ';
			}
			regy++;
			regx = 0;
// SH
			if (regy > regYMax) {
				regy = regYMax;
				charLineUp(1);
			}
		} else if (c == '\t') {
			for (var i = 0; i <= regx % 5; i++) {
				display.char(' ', regx * 6, regy * 8, fc, bc);
// SH
				charArray[regx + regy * regXMax] = ' ';
				regx++;
// SH
				if (regx > regXMax) {
					i = 99;
					regy++;
					regx = 0;
// SH
					if (regy > regYMax) {
						regy = regYMax;
						charLineUp(1);
					}
				}
			}
		} else {
			display.char(c, regx * 6, regy * 8, fc, bc);
// SH
			charArray[regx + regy * regXMax] = c;
			regx++;
			if (regx > regXMax) {
				regy++;
				regx = 0;
// SH
				if (regy > regYMax) {
					regy = regYMax;
					charLineUp(1);
				}
			}
		}
	}

	function randomInteger(min, max) {
		var rand = min - 0.5 + Math.random() * (max - min + 1)
			rand = Math.round(rand);
		return rand;
	}

	function distancepp(x1, y1, x2, y2) {
		if (x1 > 0x7fff)
			x1 = x1 - 0x10000;
		if (y1 > 0x7fff)
			y1 = y1 - 0x10000;
		if (x2 > 0x7fff)
			x2 = x2 - 0x10000;
		if (y2 > 0x7fff)
			y2 = y2 - 0x10000;
		return Math.floor(Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2)));
	}

	function setDataName(address){
		dataName = address;
	}

	function saveData(arrayAddress, count){
		var name, array, i;
		if(dataName > 0){
			name = '';
			i = 0;
			while(i < 12 && mem[dataName + i] != 0){
				name += String.fromCharCode(mem[dataName + i]);
				i++;
			}
		}
		else
			name = 'default';
		array = [];
		if(count > 242)
			count = 242;
		for(i = 0; i < count; i++)
			array[i] = mem[arrayAddress + i];
		localStorage[name] = array;
		return count;
	}

	function loadData(arrayAddress){
		var name, array, i;
		if(dataName > 0){
			name = '';
			i = 0;
			while(i < 12 && mem[dataName + i] != 0){
				name += String.fromCharCode(mem[dataName + i]);
				i++;
			}
		}
		else
			name = 'default';
		if (localStorage[name]){
			array = localStorage[name].split(',');
			for (i = 0; i < array.length; i++)
				mem[arrayAddress + i] = parseInt(array[i], 10) & 0xff;
			return i;
		}
		return 0;
	}

	function step() {
		//all commands are double-byte, some are followed by two bytes of data
		var op1 = mem[pc++]; //first byte
		var op2 = mem[pc++]; //second byte
		var reg1 = 0; //additional variables
		var reg2 = 0;
		var reg3 = 0;
		var n = 0;
		switch (op1 & 0xf0) {
		case 0x00:
			switch (op1) {
			case 0x01:
				//LDI R,int		01 0R XXXX
				reg1 = (op2 & 0xf);
				reg[reg1] = readInt(pc);
				setFlags(reg[reg1]);
				pc += 2;
				break;
			case 0x02:
				//LDI R,(R)		02 RR
				reg1 = ((op2 & 0xf0) >> 4);
				reg2 = (op2 & 0xf);
				reg[reg1] = readInt(reg[reg2]);
				setFlags(reg[reg1]);
				break;
			case 0x03:
				//LDI R,(adr)	03 0R XXXX
				reg1 = (op2 & 0xf);
				reg[reg1] = readInt(readInt(pc));
				setFlags(reg[reg1]);
				pc += 2;
				break;
			case 0x04:
				//LDI R,(int+R)	04 RR XXXX
				reg1 = ((op2 & 0xf0) >> 4);
				reg2 = (op2 & 0xf);
				reg[reg1] = readInt(reg[reg2] + readInt(pc));
				setFlags(reg[reg1]);
				pc += 2;
				break;
			case 0x05:
				//STI (R),R		05 RR
				reg1 = (op2 & 0xf0) >> 4;
				reg2 = op2 & 0xf;
				//writeInt(readInt(reg[reg1]),reg[reg2]);
				writeInt(reg[reg1], reg[reg2]);
				break;
			case 0x06:
				if ((op2 & 0x0f) == 0) {
					//STI (adr),R	06 R0 XXXX
					reg1 = (op2 & 0xf0) >> 4;
					writeInt(readInt(pc), reg[reg1]);
					pc += 2;
				} else {
					//STI (adr+R),R 06 RR XXXX
					reg1 = (op2 & 0xf0) >> 4;
					reg2 = op2 & 0xf;
					writeInt(readInt(pc) + reg[reg1], reg[reg2]);
					pc += 2;
				}
				break;
			case 0x07:
				//MOV R,R		07 RR
				reg1 = (op2 & 0xf0) >> 4;
				reg2 = op2 & 0xf;
				reg[reg1] = reg[reg2];
				break;
			case 0x08:
				//LDIAL R,(int+R*2)	08 RR XXXX
				reg1 = (op2 & 0xf0) >> 4;
				reg2 = op2 & 0xf;
				reg[reg1] = readInt(reg[reg2] * 2 + readInt(pc));
				setFlags(reg[reg1]);
				pc += 2;
				break;
			case 0x09:
				//STIAL (adr+R*2),R 	09 RR XXXX
				reg1 = (op2 & 0xf0) >> 4;
				reg2 = op2 & 0xf;
				writeInt(readInt(pc) + reg[reg1] * 2, reg[reg2]);
				pc += 2;
				break;
			default:
				pc++;
			}
			break;
		case 0x10:
			// LDC R,char	1R XX
			reg1 = (op1 & 0xf);
			reg[reg1] = op2;
			setFlagsC(reg[reg1]);
			break;
		case 0x20:
			if (op1 == 0x20) {
				// LDC R,(R)	20 RR
				reg1 = ((op2 & 0xf0) >> 4);
				reg2 = (op2 & 0xf);
				reg[reg1] = readMem(reg[reg2]);
				setFlagsC(reg[reg1]);
			} else {
				// LDC R,(R+R)	2R RR
				reg1 = (op1 & 0xf);
				reg2 = ((op2 & 0xf0) >> 4);
				reg3 = (op2 & 0xf);
				reg[reg1] = readMem(reg[reg2] + reg[reg3]);
				setFlagsC(reg[reg1]);
			}
			break;
		case 0x30:
			switch (op1) {
			case 0x30:
				// LDC R,(int+R)30 RR XXXX
				reg1 = ((op2 & 0xf0) >> 4);
				reg2 = (op2 & 0xf);
				reg[reg1] = readMem(reg[reg2] + readInt(pc));
				setFlagsC(reg[reg1]);
				pc += 2;
				break;
			case 0x31:
				// LDC R,(adr)	31 0R XXXX
				reg1 = (op2 & 0xf);
				reg[reg1] = readMem(readInt(pc));
				setFlagsC(reg[reg1]);
				pc += 2;
				break;
			case 0x32:
				// STC (adr),R	32 0R XXXX
				reg1 = (op2 & 0xf0) >> 4;
				writeMem(readInt(pc), reg[reg1]);
				pc += 2;
				break;
			case 0x33:
				// STC (int+R),R33 RR XXXX
				reg1 = (op2 & 0xf0) >> 4;
				reg2 = op2 & 0xf;
				writeMem(readInt(pc) + reg[reg1], reg[reg2]);
				pc += 2;
				break;
			}
			break;
		case 0x40:
			if (op1 == 0x40) {
				// STC (R),R	40 RR
				reg1 = (op2 & 0xf0) >> 4;
				reg2 = op2 & 0xf;
				//writeMem(readInt(reg[reg1]),reg[reg2]);
				writeMem(reg[reg1], reg[reg2]);
			} else {
				// STC (R+R),R	4R RR
				reg1 = (op1 & 0xf);
				reg2 = ((op2 & 0xf0) >> 4);
				reg3 = (op2 & 0xf);
				writeMem(reg[reg1] + reg[reg2], reg[reg3]);
			}
			break;
		case 0x50:
			switch (op1) {
			case 0x50:
				//HLT				5000
				pc -= 2;
				break;
			case 0x51:
				// STIMER R,R		51RR
				reg1 = (op2 & 0xf0) >> 4;
				reg2 = op2 & 0xf;
				timers[reg[reg1] & 0x7] = reg[reg2];
				break;
			case 0x52:
				// GTIMER R		520R
				reg1 = op2 & 0xf;
				reg[reg1] = timers[reg[reg1] & 0x7];
				setFlags(reg[reg1]);
				break;
			case 0x53:
				// SETLED R		530R
				reg1 = op2 & 0xf;
				display.drawLed(reg[reg1]);
				//console.log('New pixel color: ' + reg[reg1]);
				break;
			case 0x54:
				// LOADRT		540R
				reg1 = (op2 & 0xf0) >> 4;
				reg2 = op2 & 0xf;
				rtttl.address = reg[reg1];
				rtttl.loop = reg[reg2];
				loadRtttl();
				break;
			case 0x55:
				switch (op2) {
					// PLAYRT		5500
				case 0x00:
					rtttl.play = 1;
					break;
					// PAUSERT		5501
				case 0x01:
					rtttl.play = 0;
					break;
					// STOPRT		5502
				case 0x02:
					rtttl.play = 0;
					rtttl.position = 0;
					break;
				}
				break;
			case 0x56:
				// LOADRT		540R
				reg1 = (op2 & 0xf0) >> 4;
				reg2 = op2 & 0xf;
				addTone(reg[reg1], reg[reg2]);
				break;
			case 0x57:
				if (op2 < 0x10){
					// LDATA R			57 0R
					reg2 = op2 & 0xf;
					reg[reg2] = loadData(reg[reg2]);
				}
				else if (op2 < 0x20){
					// NDATA R			57 1R
					reg2 = op2 & 0xf;
					setDataName(reg[reg2]);
				}
				break;
			case 0x58:
				// SDATA R,R			58 RR
				reg1 = (op2 & 0xf0) >> 4;
				reg2 = op2 & 0xf;
				reg[reg1] = saveData(reg[reg1], reg[reg2]);
				break;
			}
			break;
		case 0x60:
			// LDI R,(R+R)	6R RR
			reg1 = (op1 & 0xf);
			reg2 = ((op2 & 0xf0) >> 4);
			reg3 = (op2 & 0xf);
			reg[reg1] = readInt(reg[reg2] + reg[reg3]);
			setFlags(reg[reg1]);
			break;
		case 0x70:
			// STI (R+R),R	7R RR
			reg1 = (op1 & 0xf);
			reg2 = ((op2 & 0xf0) >> 4);
			reg3 = (op2 & 0xf);
			writeInt(reg[reg1] + reg[reg2], reg[reg3]);
			break;
		case 0x80:
			switch (op1) {
			case 0x80:
				// POP R		80 0R
				reg1 = (op2 & 0xf);
				reg[reg1] = readInt(reg[0]);
				reg[0] += 2;
				break;
			case 0x81:
				// POPN R		81 0R
				reg1 = (op2 & 0xf);
				for (var j = reg1; j >= 1; j--) {
					reg[j] = readInt(reg[0]);
					reg[0] += 2;
				}
				break;
			case 0x82:
				// PUSH R		82 0R
				reg1 = (op2 & 0xf);
				reg[0] -= 2;
				writeInt(reg[0], reg[reg1]);
				break;
			case 0x83:
				// PUSHN R		83 0R
				reg1 = (op2 & 0xf);
				for (var j = 1; j <= reg1; j++) {
					reg[0] -= 2;
					writeInt(reg[0], reg[j]);
				}
				break;
			}
			break;
		case 0x90:
			switch (op1) {
			case 0x90:
				// JMP adr		90 00 XXXX
				pc = readInt(pc);
				break;
			case 0x91:
				// JNZ adr		91 00 XXXX
				if (zero == 0)
					pc = readInt(pc);
				else
					pc += 2;
				break;
			case 0x92:
				// JZ adr		92 00 XXXX
				if (zero != 0)
					pc = readInt(pc);
				else
					pc += 2;
				break;
			case 0x93:
				// JNP adr		93 00 XXXX
				if (negative == 1)
					pc = readInt(pc);
				else
					pc += 2;
				break;
			case 0x94:
				// JP adr		94 00 XXXX
				if (negative != 1)
					pc = readInt(pc);
				else
					pc += 2;
				break;
			case 0x95:
				// JNC adr		95 00 XXXX
				if (carry != 1)
					pc = readInt(pc);
				else
					pc += 2;
				break;
			case 0x96:
				// JC adr		96 00 XXXX
				if (carry == 1)
					pc = readInt(pc);
				else
					pc += 2;
				break;
			case 0x97:
				// JZR R,adr	97 0R XXXX
				reg1 = op2 & 0xf;
				if (reg[reg1] == 0)
					pc = readInt(pc);
				else
					pc += 2;
				break;
			case 0x98:
				// JNZR R,adr	98 0R XXXX
				reg1 = op2 & 0xf;
				if (reg[reg1] != 0)
					pc = readInt(pc);
				else
					pc += 2;
				break;
			case 0x99:
				// CALL adr		99 00 XXXX
				reg[0] -= 2;
				if (reg[0] < 0)
					reg[0] += 0xffff;
				writeInt(reg[0], pc + 2);
				pc = readInt(pc);
				break;
			case 0x9A:
				// RET			9A 00
				if (interrupt == 0) {
					pc = readInt(reg[0]);
					reg[0] += 2;
				} else {
					pc = readInt(reg[0]);
					if (pc == interrupt) {
						reg[0] += 4;
						for (var j = 15; j >= 1; j--) {
							reg[j] = readInt(reg[0]);
							reg[0] += 2;
						}
						byteToFlags(readInt(reg[0]));
						reg[0] += 2;
						interrupt = 0;
						if (interruptBuffer.length > 0)
							setinterrupt(interruptBuffer.pop(), interruptBuffer.pop());
					} else
						reg[0] += 2;
				}
				break;
			}
			break;
		case 0xA0:
			switch (op1) {
			case 0xA0:
				// ADD R,R		A0 RR
				reg1 = (op2 & 0xf0) >> 4;
				reg2 = op2 & 0xf;
				n = reg[reg1] + reg[reg2];
				n = setFlags(n);
				reg[reg1] = n;
				break;
			case 0xA1:
				// ADC R,R		A1 RR
				reg1 = (op2 & 0xf0) >> 4;
				reg2 = op2 & 0xf;
				n = reg[reg1] + reg[reg2] + carry;
				n = setFlags(n);
				reg[reg1] = n;
				break;
			case 0xA2:
				// SUB R,R		A2 RR
				reg1 = (op2 & 0xf0) >> 4;
				reg2 = op2 & 0xf;
				n = reg[reg1] - reg[reg2];
				n = setFlags(n);
				reg[reg1] = n;
				break;
			case 0xA3:
				// SBC R,R		A3 RR
				reg1 = (op2 & 0xf0) >> 4;
				reg2 = op2 & 0xf;
				n = reg[reg1] - reg[reg2] - carry;
				n = setFlags(n);
				reg[reg1] = n;
				break;
			case 0xA4:
				// MUL R,R		A4 RR
				reg1 = (op2 & 0xf0) >> 4;
				reg2 = op2 & 0xf;
				n = reg[reg1] * reg[reg2];
				n = setFlags(n);
				reg[reg1] = n;
				break;
			case 0xA5:
				// DIV R,R		A5 RR
				reg1 = (op2 & 0xf0) >> 4;
				reg2 = op2 & 0xf;
				if (reg[reg1] > 0x7fff)
					reg[reg1] -= 0x10000;
				if (reg[reg2] > 0x7fff)
					reg[reg2] -= 0x10000;
				n = reg[reg1] / reg[reg2];
				n = setFlags(n);
				reg[reg2] = Math.abs(reg[reg1] % reg[reg2]);
				reg[reg1] = n;
				break;
			case 0xA6:
				// AND R,R		A6 RR
				reg1 = (op2 & 0xf0) >> 4;
				reg2 = op2 & 0xf;
				n = reg[reg1] & reg[reg2];
				n = setFlags(n);
				reg[reg1] = n;
				break;
			case 0xA7:
				// OR R,R		A7 RR
				reg1 = (op2 & 0xf0) >> 4;
				reg2 = op2 & 0xf;
				n = reg[reg1] | reg[reg2];
				n = setFlags(n);
				reg[reg1] = n;
				break;
			case 0xA8:
				if (op2 == 0x10) {
					// INC adr		A8 10 XXXX
					reg1 = op2 & 0xf;
					n = readInt(readInt(pc)) + 1;
					n = setFlags(n);
					writeInt(readInt(pc), n);
					pc += 2;
				} else if (op2 > 0x10) {
					// INC R,n		A8 nR
					reg1 = op2 & 0xf;
					n = reg[reg1] + (op2 >> 4);
					n = setFlags(n);
					reg[reg1] = n;
				} else {
					// INC R		A8 0R
					reg1 = op2 & 0xf;
					n = reg[reg1] + 1;
					n = setFlags(n);
					reg[reg1] = n;
				}
				break;
			case 0xA9:
				if (op2 == 0x10) {
					// DEC adr		A9 10 XXXX
					reg1 = op2 & 0xf;
					n = readInt(readInt(pc)) - 1;
					n = setFlags(n);
					writeInt(readInt(pc), n);
					pc += 2;
				} else if (op2 > 0x10) {
					// DEC R,n		A9 nR
					reg1 = op2 & 0xf;
					n = reg[reg1] - (op2 >> 4);
					n = setFlags(n);
					reg[reg1] = n;
				} else {
					// DEC R		A9 0R
					reg1 = op2 & 0xf;
					n = reg[reg1] - 1;
					n = setFlags(n);
					reg[reg1] = n;
				}
				break;
			case 0xAA:
				// XOR R,R		AA RR
				reg1 = (op2 & 0xf0) >> 4;
				reg2 = op2 & 0xf;
				n = reg[reg1] ^ reg[reg2];
				n = setFlags(n);
				reg[reg1] = n;
				break;
			case 0xAB:
				// SHL R,R		AB RR
				reg1 = (op2 & 0xf0) >> 4;
				reg2 = op2 & 0xf;
				n = reg[reg1] << reg[reg2];
				n = setFlags(n);
				reg[reg1] = n;
				break;
			case 0xAC:
				// SHR R,R		AC RR
				reg1 = (op2 & 0xf0) >> 4;
				reg2 = op2 & 0xf;
				n = reg[reg1] >> reg[reg2];
				n = setFlags(n);
				reg[reg1] = n;
				break;
			case 0xAD:
				reg1 = op2 & 0xf;
				reg2 = op2 & 0xf0;
				// RAND R,R		AD 0R
				if (reg2 == 0x00) {
					n = randomInteger(0, reg[reg1]);
					n = setFlags(n);
					reg[reg1] = n;
				}
				// SQRT R		AD 1R
				else if (reg2 == 0x10) {
					n = Math.floor(Math.sqrt(reg[reg1]));
					n = setFlags(n);
					reg[reg1] = n;
				}
				break;
			case 0xAE:
				// ANDL R,R		AE RR
				reg1 = (op2 & 0xf0) >> 4;
				reg2 = op2 & 0xf;
				n = (reg[reg1] != 0 && reg[reg2] != 0) ? 1 : 0;
				n = setFlags(n);
				reg[reg1] = n;
				break;
			case 0xAF:
				// ORL R,R		AF RR
				reg1 = (op2 & 0xf0) >> 4;
				reg2 = op2 & 0xf;
				n = (reg[reg1] != 0 || reg[reg2] != 0) ? 1 : 0;
				n = setFlags(n);
				reg[reg1] = n;
				break;
			}
			break;
		case 0xB0:
			//CMP R,CHR		BR XX
			reg1 = (op1 & 0x0f);
			n = reg[reg1] - op2;
			n = setFlags(n);
			break;
		case 0xC0:
			switch (op1) {
			case 0xC0:
				//CMP R,INT		C0 R0 XXXX
				reg1 = (op2 & 0xf0) >> 4;
				n = reg[reg1] - readInt(pc);
				n = setFlags(n);
				pc += 2;
				break;
			case 0xC1:
				//CMP R,R		C1 RR
				reg1 = (op2 & 0xf0) >> 4;
				reg2 = op2 & 0xf;
				n = reg[reg1] - reg[reg2];
				n = setFlags(n);
				break;
			case 0xC2:
				//LDF R,F		C2 RF
				reg1 = (op2 & 0xf0) >> 4;
				reg2 = op2 & 0xf;
				if (reg2 == 0)
					reg[reg1] = carry;
				else if (reg2 == 1)
					reg[reg1] = zero;
				else if (reg2 == 2)
					reg[reg1] = negative;
				else if (reg2 == 3) { //positive
					if (negative == 0 && zero == 0)
						reg[reg1] = 1;
					else
						reg[reg1] = 0;
				} else if (reg2 == 4) { //not positive
					if (negative == 0 && zero == 0)
						reg[reg1] = 0;
					else
						reg[reg1] = 1;
				} else if (reg2 == 5)
					reg[reg1] = 1 - zero;
				else if (reg2 == 6) {
					reg[reg1] = redraw;
					redraw = 0;
				} else
					reg[reg1] = 0;
				break;
			}
			break;
		case 0xD0:
			switch (op1) {
			case 0xD0:
				//CLS		D000
				if ((op2 & 0xff) == 0) {
					display.clearScreen(bgcolor);
				} else {
					//GSPRXY R,R
					reg1 = (op2 & 0xf0) >> 4;
					reg2 = op2 & 0xf;
					reg[reg1] = getSpriteInXY(reg[reg1], reg[reg2]);
				}
				break;
			case 0xD1:
				switch (op2 & 0xf0) {
				case 0x00:
					//PUTC R	D10R
					reg1 = (op2 & 0xf);
					//console.log(String.fromCharCode(reg[reg1]) + ':' + reg[reg1]);
					printc(String.fromCharCode(reg[reg1]), color, bgcolor);
					break;
				case 0x10:
					//PUTS R	D11R
					reg1 = (op2 & 0xf);
					var i = 0;
					//console.log(String.fromCharCode(readMem(reg[reg1])));
					while (!(readMem(reg[reg1] + i) == 0 || i > 1000)) {
						printc(String.fromCharCode(readMem(reg[reg1] + i)), color, bgcolor);
						i++;
					}
					break;
				case 0x20:
					//PUTN R D12R
					reg1 = (op2 & 0xf);
					var s;
					if (reg[reg1] < 32768)
						s = reg[reg1].toString(10);
					else
						s = (reg[reg1] - 0x10000).toString(10);
					for (var i = 0; i < s.length; i++) {
						printc(s[i], color, bgcolor);
						//console.log(s[i]);
					}
					break;
				case 0x30:
					//SETX R			D13R
					reg1 = (op2 & 0xf);
					regx = (reg[reg1] & 0xff);
					break;
				case 0x40:
					//SETY R			D14R
					reg1 = (op2 & 0xf);
					regy = (reg[reg1] & 0xff);
					break;
				}
				break;
			case 0xD2:
				switch (op2 & 0xf0) {
				case 0x00:
					// GETK R			D20R
					reg1 = (op2 & 0xf);
					display.viewKeyboard(keyPosition);
					if (globalJKey == 1 && keyPosition > 21)
						keyPosition -= 21;
					if (globalJKey == 2 && keyPosition < 42)
						keyPosition += 21;
					if (globalJKey == 4 && keyPosition > 0)
						keyPosition--;
					if (globalJKey == 8 && keyPosition < 62)
						keyPosition++;
					if (globalJKey >= 16)
						globalKey = keyArray.charCodeAt(keyPosition) & 0xff;
					globalJKey = 0;
					if (globalKey != 0)
						reg[reg1] = globalKey;
					else
						pc -= 2;
					globalKey = 0;
					break;
				case 0x10:
					// GETJ R			D21R
					reg1 = (op2 & 0xf);
					reg[reg1] = globalJKey;
					break;
				}
				break;
			case 0xD3:
				// PPIX R,R		D3RR
				reg1 = (op2 & 0xf0) >> 4;
				reg2 = op2 & 0xf;
				display.plot(color, reg[reg1], reg[reg2]);
				break;
			case 0xD4:
				switch (op2 & 0xf0) {
				case 0x00:
					// DRWIM R			D40R
					reg1 = op2 & 0xf;
					reg2 = reg[reg1]; //the register indicates a portion of memory in which h, w, y, x are located in series, the address
					if (imageSize > 1)
						drawImageS(readInt(reg2 + 8), readInt(reg2 + 6), readInt(reg2 + 4), readInt(reg2 + 2), readInt(reg2));
					else
						drawImage(readInt(reg2 + 8), readInt(reg2 + 6), readInt(reg2 + 4), readInt(reg2 + 2), readInt(reg2));
					break;
				case 0x10:
					// SFCLR R			D41R
					reg1 = op2 & 0xf;
					color = reg[reg1] & 0xf;
					break;
				case 0x20:
					// SBCLR R			D42R
					reg1 = op2 & 0xf;
					bgcolor = reg[reg1] & 0xf;
					break;
				case 0x30:
					// GFCLR R			D43R
					reg1 = op2 & 0xf;
					reg[reg1] = color;
					break;
				case 0x40:
					// GBCLR R			D44R
					reg1 = op2 & 0xf;
					reg[reg1] = bgcolor;
					break;
				case 0x50:
					// ISIZE			D45R
					reg1 = op2 & 0xf;
					imageSize = reg[reg1] & 31;
					break;
				case 0x60:
					// DLINE			D46R
					reg1 = op2 & 0xf;
					reg2 = reg[reg1]; //the register indicates a portion of memory in which y1, x1, y, x are located sequentially
					drawLine(readInt(reg2 + 6), readInt(reg2 + 4), readInt(reg2 + 2), readInt(reg2));
					break;
				case 0x70:
					// DRWRLE R		D47R
					reg1 = op2 & 0xf;
					reg2 = reg[reg1]; //the register indicates a portion of memory in which h, w, y, x are located in series, the address
					if (imageSize > 1)
						drawImageRLES(readInt(reg2 + 8), readInt(reg2 + 6), readInt(reg2 + 4), readInt(reg2 + 2), readInt(reg2));
					else
						drawImageRLE(readInt(reg2 + 8), readInt(reg2 + 6), readInt(reg2 + 4), readInt(reg2 + 2), readInt(reg2));
					break;
				case 0x80:
					// LDTILE R		D4 8R
					reg1 = op2 & 0xf;
					reg2 = reg[reg1]; //the register indicates the portion of memory in which height, width, iheight, iwidth, adr are sequentially
					loadTile(readInt(reg2 + 8), readInt(reg2 + 6), readInt(reg2 + 4), readInt(reg2 + 2), readInt(reg2));
					break;
				case 0x90:
					// SPRSDS R*2	D4 9R
					reg1 = op2 & 0xf;
					reg2 = reg[reg1]; //the register indicates a portion of memory in which direction, speed, n are sequentially
					spriteSetDirectionAndSpeed(readInt(reg2 + 4), readInt(reg2 + 2), readInt(reg2));
					break;
				case 0xA0:
					// DRW1BIT R	D4AR
					reg1 = op2 & 0xf;
					reg2 = reg[reg1]; //the register indicates a portion of memory in which h, w, y, x are located sequentially, the address
					if (imageSize > 1)
						drawImage1bitS(readInt(reg2 + 8), readInt(reg2 + 6), readInt(reg2 + 4), readInt(reg2 + 2), readInt(reg2));
					else
						drawImage1bit(readInt(reg2 + 8), readInt(reg2 + 6), readInt(reg2 + 4), readInt(reg2 + 2), readInt(reg2));
					break;
				}
				break;
			case 0xD5:
				// LDSPRT R,R		D5RR
				reg1 = (op2 & 0xf0) >> 4; //sprite number
				reg2 = op2 & 0xf; //sprite address
				setSprite(reg[reg1] & 0x1f, reg[reg2]);
				break;
			case 0xD6:
				// SPALET R,R		D6 RR
				reg1 = (op2 & 0xf0) >> 4; //colour number
				reg2 = op2 & 0xf; //new colour
				display.changePalette(reg[reg1], reg[reg2]);
				break;
			case 0xD7:
				reg1 = op2 & 0xf;
				reg2 = reg[reg1];
				if ((op2 & 0xf0) == 0)
					// SPART R 		D7 0R
					//the register indicates the portion of memory in which count, time, gravity are located in series
					setParticle(readInt(reg2 + 4), readInt(reg2 + 2), readInt(reg2));
				else if ((op2 & 0xf0) == 0x10)
					//the register indicates the portion of memory in which speed, direction2, direction1, time are located in series
					setEmitter(readInt(reg2 + 6), readInt(reg2 + 4), readInt(reg2 + 2), readInt(reg2));
				else if ((op2 & 0xf0) == 0x20)
					//the register indicates a piece of memory in which color, y, x are located in series
					drawParticle(readInt(reg2 + 4), readInt(reg2 + 2), readInt(reg2));
				else if ((op2 & 0xf0) == 0x50)
					//the register indicates a piece of memory in which color, y, x are located in series
					reg[1] = distancepp(readInt(reg2 + 6), readInt(reg2 + 4), readInt(reg2 + 2), readInt(reg2));
				break;
			case 0xD8:
				// SCROLL R,R		D8RR
				reg1 = (op2 & 0xf0) >> 4; //step to finish
				reg2 = op2 & 0xf; //direction
				scrollScreen(1, reg[reg2]);
				if (reg[reg2] == 0 || reg[reg2] == 2)
					scrollScreen(1, reg[reg2]);
				break;
			case 0xD9:
				// GETPIX R,R		D9RR
				reg1 = (op2 & 0xf0) >> 4; //x
				reg2 = op2 & 0xf; //y
				reg[reg1] = display.getPixel(reg[reg1], reg[reg2]);
				break;
			case 0xDA:
				// DRTILE R		DA RR
				reg1 = (op2 & 0xf0) >> 4; //x
				reg2 = op2 & 0xf; //y
				drawTile(reg[reg1], reg[reg2]);
				break;
			case 0xDB:
				// SPRSPX R,R		DB RR
				reg1 = (op2 & 0xf0) >> 4; //num
				reg2 = op2 & 0xf; //speed y

				break;
			case 0xDC:
				// SPRGET R,R		DC RR
				reg1 = (op2 & 0xf0) >> 4; //num
				reg2 = op2 & 0xf; //type
				if (reg[reg2] == 0)
					reg[reg1] = Math.floor(sprites[reg[reg1] & 31].x >> 2);
				else if (reg[reg2] == 1)
					reg[reg1] = Math.floor(sprites[reg[reg1] & 31].y >> 2);
				else if (reg[reg2] == 2)
					reg[reg1] = sprites[reg[reg1] & 31].speedx;
				else if (reg[reg2] == 3)
					reg[reg1] = sprites[reg[reg1] & 31].speedy;
				else if (reg[reg2] == 4)
					reg[reg1] = sprites[reg[reg1] & 31].width;
				else if (reg[reg2] == 5)
					reg[reg1] = sprites[reg[reg1] & 31].height;
				else if (reg[reg2] == 6)
					reg[reg1] = sprites[reg[reg1] & 31].angle;
				else if (reg[reg2] == 7)
					reg[reg1] = sprites[reg[reg1] & 31].lives;
				else if (reg[reg2] == 8)
					reg[reg1] = sprites[reg[reg1] & 31].collision;
				else if (reg[reg2] == 9)
					reg[reg1] = sprites[reg[reg1] & 31].solid;
				else if (reg[reg2] == 10)
					reg[reg1] = sprites[reg[reg1] & 31].gravity;
				break;
			case 0xDE:
				// AGBSPR R,R			DE RR
				reg1 = (op2 & 0xf0) >> 4; //n1
				reg2 = op2 & 0xf; //n2
				reg[reg1] = angleBetweenSprites(reg[reg1], reg[reg2]);
				break;
			case 0xDF:
				// GTILEXY R,R			DF RR
				reg1 = (op2 & 0xf0) >> 4;
				reg2 = op2 & 0xf;
				reg[reg1] = getTileInXY(reg[reg1], reg[reg2]);
				break;
			}
			break;
		case 0xE0:
			// DRSPRT R,R,R	ERRR
			reg1 = (op1 & 0xf); //sprite number
			reg2 = (op2 & 0xf0) >> 4; //x
			reg3 = op2 & 0xf; //y
			drawSprite(reg[reg1] & 0x1f, reg[reg2], reg[reg3]);
			if (sprites[reg[reg1] & 31].lives < 1)
				sprites[reg[reg1] & 31].lives = 1;
			break;
		case 0xF0:
			// SSPRTV R,R,R	FR RR
			reg1 = (op1 & 0xf); //sprite number
			reg2 = (op2 & 0xf0) >> 4; //type
			reg3 = op2 & 0xf; //value
			if (reg[reg2] == 0) {
				if (reg[reg3] > 0x7fff)
					sprites[reg[reg1] & 31].x = (reg[reg3] - 0x10000) << 2;
				else
					sprites[reg[reg1] & 31].x = reg[reg3] << 2;
			} else if (reg[reg2] == 1) {
				if (reg[reg3] > 0x7fff)
					sprites[reg[reg1] & 31].y = (reg[reg3] - 0x10000) << 2;
				else
					sprites[reg[reg1] & 31].y = reg[reg3] << 2;
			} else if (reg[reg2] == 2) {
// SH
				if (reg[reg3] > (iW - iX))
					sprites[reg[reg1] & 31].speedx =  - ((iW - iX) * 2 - (reg[reg3] & ((iW - iX) * 2 - 1)));
				else
					sprites[reg[reg1] & 31].speedx = reg[reg3];
			} else if (reg[reg2] == 3) {
// SH
				if (reg[reg3] > iH)
					sprites[reg[reg1] & 31].speedy =  - (iH * 2 - (reg[reg3] & (iH * 2 - 1)));
				else
					sprites[reg[reg1] & 31].speedy = reg[reg3];
			} else if (reg[reg2] == 4)
				sprites[reg[reg1] & 31].width = reg[reg3];
			else if (reg[reg2] == 5)
				sprites[reg[reg1] & 31].height = reg[reg3];
			else if (reg[reg2] == 6)
				if (reg[reg3] > 0x7fff)
					sprites[reg[reg1] & 31].angle = (reg[reg3] - 0x10000) % 360;
				else
					sprites[reg[reg1] & 31].angle = reg[reg3] % 360;
			else if (reg[reg2] == 7) {
				if (reg[reg3] > 128)
					sprites[reg[reg1] & 31].lives =  - (256 - (reg[reg3] & 0xff));
				else
					sprites[reg[reg1] & 31].lives = reg[reg3];
			} else if (reg[reg2] == 9)
				sprites[reg[reg1] & 31].solid = reg[reg3];
			else if (reg[reg2] == 10)
				sprites[reg[reg1] & 31].gravity = reg[reg3];
			else if (reg[reg2] == 11)
				sprites[reg[reg1] & 31].oncollision = reg[reg3];
			else if (reg[reg2] == 12)
				sprites[reg[reg1] & 31].onexitscreen = reg[reg3];
			else if (reg[reg2] == 13)
				sprites[reg[reg1] & 31].isscrolled = reg[reg3];
			else if (reg[reg2] == 14)
				sprites[reg[reg1] & 31].isonebit = reg[reg3];
			else if (reg[reg2] == 15)
				sprites[reg[reg1] & 31].fliphorizontal = reg[reg3];
			break;
		}
	}

	function clearStringFast(str) {
		return str.length < 12 ? str : (' ' + str).slice(1);
	}

	function debug() {
		var d = '';
		var s = 'pc:' + toHex4(pc) + '\t';
		s += 'op:' + toHex4((mem[pc] << 8) + mem[pc + 1]) + '\n';
		s += 'C' + carry + 'Z' + zero + 'N' + negative + '\n';
		for (var i = 0; i < 16; i++)
			s += 'R' + i + ':' + toHex4(reg[i]) + ' (' + reg[i] + ')\n';
		for (var i = 0; i < debugVar.length; i++) {
			d += debugVar[i].variable + '\t';
			d += toHex4(debugVar[i].adress) + '   ';
			d += readInt(debugVar[i].adress) + '\n';
		}
		d = clearStringFast(d);
		debugVarArea.value = d;
		viewMemory();
		for (var i = 0; i < numberDebugString.length; i++)
			if (numberDebugString[i][2] == pc) {
				thisDebugString = numberDebugString[i][1];
			}
		d = '';
		for (var i = 0; i < 32; i++) {
			d += '\nsprite ' + i + '\n';
			d += 'S_ADDRESS \t' + toHex4(sprites[i].address) + '\n';
			d += 'S_X \t' + sprites[i].x + '\n';
			d += 'S_Y \t' + sprites[i].y + '\n';
			d += 'S_SPEEDX \t' + sprites[i].speedx + '\n';
			d += 'S_SPEEDY \t' + sprites[i].speedy + '\n';
			d += 'S_WIDTH \t' + sprites[i].width + '\n';
			d += 'S_HEIGHT \t' + sprites[i].height + '\n';
			d += 'S_ANGLE \t' + sprites[i].angle + '\n';
			d += 'S_LIVES \t' + sprites[i].lives + '\n';
		}
		d = clearStringFast(d);
		debugSprArea.value = d;
		highliteLine();
		return s;
	}

// SH
	function getsProc() {
		return sProc;
	}

	return {
		init: init,
		load: load,
		step: step,
		debug: debug,
		readMem: readMem,
		setRedraw: setRedraw,
		redrawSprite: redrawSprite,
		redrawParticle: redrawParticle,
		testSpriteCollision: testSpriteCollision,
// SH
		getsProc: getsProc
	};
}

var cpu = new Cpu;
cpu.init();
