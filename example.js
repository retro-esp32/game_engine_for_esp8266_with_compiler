var example=[
['particle','void main(){\n\twhile(1){\n\t\t//gravity, time, count\n\t\tsetparticle(1, 4, 2000);\n\t\t//time, dir, dir1, speed\t\t\t\n\t\tsetemitter(50, 200, 250, 12);\t\n\t\tfor(int i =0; i< 60; i++){\n\t\t\t//x, y, color\n\t\t\tdrawparticle(60 + i, 60, i);\n\t\t\tdelayredraw();\n\t\t}\n\t}\n}'],
['pi','int A[2000];\n\nvoid main(){\n  int i;\n  int j;\n  int x;\n  int k;\n  int q;\n  int nines    = 0;\n  int predigit = 0;\n  int N=90;\n  int len;\n  \n  len = (10 * N/3) + 1;\n  \n  for(i = 0; i < len; ++i) {\n    A[i] = 2;\n  }\n\n  for(j = 1; j < N + 1; ++j) {        \n    q = 0;\n    \n    if(j == 3)\n    \tprintf(",");\n\n    for(i = len; i > 0; i--) {\n      x  = 10 * A[i-1] + q*i;\n      A[i-1] = x % (2*i - 1);\n      q = x / (2*i - 1);\n    }\n\n    A[0] = q%10;\n    q    = q/10;\n\n    if (10 == q) {\n      printf("%d", predigit + 1);\n\n      for (k = 0; k < nines; k++) {\n        printf("%d", 0);\n      }\n      predigit=0; nines = 0;\n    }\n    else {\n      printf("%d", predigit);\n      predigit = q;\n\n      if (0 != nines) {    \n        for (k = 0; k < nines; k++) \n          printf("%d", 9);\n        nines = 0;\n      }\n    }\n  }\n  printf("%d", predigit);\n}'],
['snake','char snake[100];\nchar eatx,eaty;\nchar snake_length;\nchar snake_spr[] = {0x11,0x10,0x11,0x10,0x11,0x10};\nchar eat_spr[] = {0x22,0x20,0x22,0x20,0x22,0x20};\nchar snake_clr[] = {0xbb,0xb0,0xbb,0xb0,0xbb,0xb0};\nchar snake_dir;\nint i,key, game_end;\n\nvoid delay(int n){\n\tsettimer(1, n);\n\twhile(gettimer(1)){\n\t\tif(key == 0)\n\t\t\tkey = getkey();\n\t}\n}\n\nvoid init_game(){\n\tgame_end = 0;\n\tsnake_length = 6;\n\tsnake_dir = 0;\n\tsnake[0] = 1;\n\tsnake[1] = 3;\n\tsnake[2] = 1;\n\tsnake[3] = 2;\n\tsnake[4] = 1;\n\tsnake[5] = 1;\n\tsnake[6] = 1;\n\tsnake[7] = 1;\t\n\teatx = 10 + random(30);\n\teaty = 10 + random(30);\n\tputimage(eat_spr, eatx * 3, eaty * 3, 3, 3);\n}\n\nint restart(){\n\tgotoxy(4, 8);\n\tputs("game over");\n\tgotoxy(4, 9);\n\tputs("score ");\n\tputn(snake_length / 2 - 3);\n\twhile(getkey() == 0){\n\t\ti = 0;\t\n\t};\n\tclearscreen();\n\tinit_game();\n}\n\nvoid redraw(){\n\ti = 0;\n\tfor(i; i < snake_length; i++){\n\t\tputimage(snake_spr, snake[i] * 3, snake[i + 1] * 3, 3, 3); \n\t\ti++;\n\t} \n\tputimage(snake_clr, snake[snake_length] * 3, snake[snake_length + 1] * 3, 3, 3);\n}\n\nvoid action(){\n\tif((key == 1) && (snake_dir != 3))\n\t\tsnake_dir = 1;\n\telse if((key == 4) && (snake_dir != 0))\n\t\tsnake_dir = 2;\n\telse if((key == 2) && (snake_dir != 1))\n\t\tsnake_dir = 3;\n\telse if((key == 8) && (snake_dir != 2))\n\t\tsnake_dir = 0;\n\tkey = 0;\n\ti = snake_length + 1;\n\tif(snake_dir == 0){\n\t\tsnake[0] = snake[0] + 1;\n\t\tif(snake[0] >= 41){\n\t\t\tsnake[0] = 1;}\n\t}\n\telse if(snake_dir == 1){\n\t\tsnake[1] = snake[1] - 1;\n\t\tif(snake[1] <= 1){\n\t\t\tsnake[1] = 41;}\n\t}\n\telse if(snake_dir == 2){\n\t\tsnake[0] = snake[0] - 1;\n\t\tif(snake[0] <= 1){\n\t\t\tsnake[0] = 41;}\n\t}\n\telse if(snake_dir == 3){\n\t\tsnake[1] = snake[1] + 1;\n\t\tif(snake[1] >= 41){\n\t\t\tsnake[1] = 1;}\n\t}\n\tif(getpixel(snake[0] * 3 + 1, snake[1] * 3 + 1) == 1)\n\t\tgame_end = 1; \n\tif((snake[0] == eatx) && (snake[1] == eaty)){\n\t\teatx = 2 + random(38);;\n\t\teaty = 2 + random(38);;\n\t\tputimage(eat_spr, eatx * 3, eaty * 3, 3, 3);\n\t\tsnake_length++;\n\t\tsnake_length++;\n\t}\n\twhile(i > 1){\n\t\tsnake[i] = snake[i - 2]; \n\t\ti--;\n\t\tsnake[i] = snake[i - 2];\n\t\ti--;\n\t}\n\ti = 0;\n}\n\nvoid main(){\n\tinit_game();\n\twhile(1){\n\t\tif(game_end){\n\t\t\trestart();\n\t\t}\n\t\taction();\n\t\tredraw();\n\t\tdelay(200);\n\t}\n}'],
['sprite','char s0[] = {0x0,0x0,0x0,0x66,0x66,0x0,0x0,0x0,0x0,0x0,0x66,0x77,0x77,0x66,0x0,0x0,0x0,0x6,0x77,0x8f,0xc8,0x88,0x60,0x0,0x0,0x67,0x88,0x8f,0xc8,0x88,0x86,0x0,0x6,0x78,0x88,0x8f,0xc8,0x88,0x88,0x60,0x6,0x78,0x88,0x8f,0xc8,0x88,0x88,0x60,0x67,0x88,0x88,0xfc,0xcc,0x88,0x88,0xb6,0x67,0xff,0xff,0xcc,0xcc,0xcc,0xcc,0xb6,0x67,0xcc,0xcc,0xcc,0xcc,0xbb,0xbb,0xb6,0x67,0x88,0x88,0xcc,0xcb,0x88,0x88,0xb6,0x6,0x88,0x88,0x8c,0xb8,0x88,0x8b,0x60,0x6,0x88,0x88,0x8c,0xb8,0x88,0x8b,0x60,0x0,0x68,0x88,0x8c,0xb8,0x88,0xb6,0x0,0x0,0x6,0x88,0x8c,0xb8,0xbb,0x60,0x0,0x0,0x0,0x66,0xbb,0xbb,0x66,0x0,0x0,0x0,0x0,0x0,0x66,0x66,0x0,0x0,0x0,0x00};\nchar bl[] = {0x99,0x99,0x99,0x99,0xcc,0xcb,0x9c,0xcc,0xff,0xcb,0x9f,0xff,0xff,0xfb,0x9f,0xff,0x99,0x99,0x99,0x99,0xcc,0xcc,0xcc,0xb9,0xff,0xff,0xfc,0xb9,0xff,0xff,0xff,0xb9,0x00};\nchar b2[] = {0x9,0x99,0x99,0x0,0x9,0xcc,0xb9,0x0,0x9,0xfc,0xb9,0x0,0x9,0xff,0xb9,0x0,0x99,0x99,0x99,0x99,0xcc,0xcc,0xcc,0xb9,0xff,0xff,0xfc,0xb9,0xff,0xff,0xff,0xb9,0x00};\nchar j,x;\nint a = 0;\n\nvoid main(){\n\tsetimagesize(2);\n\tfor (x = 0; x < 8; x++){\n\t\tputimage(b2, x*16, 80, 8, 8);\n\t\tputimage(bl, x*16, 96, 8, 8);\n\t\tputimage(bl, x*16, 112, 8, 8);\n\t}\n\tfor (j = 0; j < 32; j++){\n\t\tgetsprite(j,s0);\n\t\tputsprite(j, random(120), random(120));\n\t\tspritespeedx(j, -4);\n\t\tspritespeedy(j, 2);\n\t\tspritesetvalue(j,S_WIDTH,16);\n\t\tspritesetvalue(j,S_HEIGHT,16);\n\t\tspritesetvalue(j,S_SOLID,1);\n\t}\n\twhile(1){\n\t\tscroll(1,2);\n\t\ta++;\n\t\tfor (j = 0; j < 32; j++){\n\t\t\tspritesetvalue(j,S_ANGLE,a);\n\t\t\tif(spritegetvalue(j, S_X) < 2)\n\t\t\t\tspritespeedx(j, 4);\n\t\t\tif(spritegetvalue(j, S_X) >118)\n\t\t\t\tspritespeedx(j, -4);\n\t\t\tif(spritegetvalue(j, S_Y) < 2)\n\t\t\t\tspritespeedy(j, 2);\n\t\t\tif(spritegetvalue(j, S_Y) > 118)\n\t\t\t\tspritespeedy(j, -2);\n\t\t}\n\t\tdelayredraw();\n\t}\n}'],
['maze generate','char wall0[] = {0xaa,0xba,0xaa,0xaa,0xbb,0xbb,0xbb,0xbb,0xaa,0xaa,0xab,0xaa,0xaa,0xaa,0xab,0xaa,0xbb,0xbb,0xbb,0xbb,0x99,0xb9,0x99,0x99,0xbb,0xbb,0xbb,0xbb,0x99,0x99,0x9b,0x99};\nchar wall1[] = {0xaa,0xba,0xaa,0xaa,0xbb,0xbb,0xbb,0xbb,0xaa,0xaa,0xab,0xaa,0xaa,0xaa,0xab,0xaa,0xbb,0xbb,0xbb,0xbb,0xaa,0xba,0xaa,0xca,0xaa,0xbc,0xcc,0xca,0xaa,0xba,0xaa,0xca};\nchar wall2[] = {0xff,0xff,0xff,0xff,0xfc,0xff,0xff,0xff,0xff,0xfc,0xff,0xcf,0xff,0xff,0xff,0xff,0xff,0xff,0xcf,0xff,0xfc,0xff,0xff,0xff,0xff,0xff,0xfc,0xff,0xff,0xff,0xff,0xff};\n\nint maze[225];\nchar stack[100];\nchar stackpoint = 0;\nchar x,y,i;\nchar generate = 1;\nint s[4];\n\nchar randomCell(){\n\tchar n = random(3);\n\tif(x == 1)\n\t\ts[2] = 1;\n\telse\n\t\ts[2] = maze[x - 2 + y * 15];\n\tif(x == 13)\n\t\ts[0] = 1;\n\telse\n\t\ts[0] = maze[x + 2 + y * 15];\n\tif(y == 1)\n\t\ts[1] = 1;\n\telse\n\t\ts[1] = maze[x + (y - 2) * 15];\n\tif(y == 13)\n\t\ts[3] = 1;\n\telse\n\t\ts[3] = maze[x + (y + 2) * 15];\n\tif(s[n] != 0){\n\t\ti = 8;\n\t\twhile(i){\n\t\t\tn++;\n\t\t\tif(n > 3)\n\t\t\t\tn = 0;\n\t\t\tif(s[n] == 0)\n\t\t\t\treturn n;\n\t\t\ti--;\n\t\t}\n\t}\n\telse\n\t\treturn n;\n\treturn 4;\n}\n\nvoid nextCell(){\n\tchar n = randomCell();\n\tif(n == 0){\n\t\tx++;\n\t\tmaze[x + y * 15] = wall2;\n\t\tx++;\n\t\tmaze[x + y * 15] = wall2;\n\t}\n\telse if(n == 1){\n\t\ty--;\n\t\tmaze[x + y * 15] = wall2;\n\t\ty--;\n\t\tmaze[x + y * 15] = wall2;\n\t}\n\telse if(n == 2){\n\t\tx--;\n\t\tmaze[x + y * 15] = wall2;\n\t\tx--;\n\t\tmaze[x + y * 15] = wall2;\n\t}\n\telse if(n == 3){\n\t\ty++;\n\t\tmaze[x + y * 15] = wall2;\n\t\ty++;\n\t\tmaze[x + y * 15] = wall2;\n\t}\n\tif(n == 4){\n\t\tif(stackpoint < 2){\n\t\t\tgenerate = 0;\n\t\t\treturn;\n\t\t}\n\t\tstackpoint--;\n\t\ty = stack[stackpoint];\n\t\tstackpoint--;\n\t\tx = stack[stackpoint];\n\t}\n\telse{\n\t\tstack[stackpoint] = x;\n\t\tstackpoint++;\n\t\tstack[stackpoint] = y;\n\t\tstackpoint++;\n\t}\n}\n\nvoid main(){\n\twhile(1){\n\t\tfor(x = 0; x < 15; x++){\n\t\t\tfor(y = 0; y < 15; y++){\n\t\t\t\tif(((x + 1) % 2 == 0) & ((y + 1) % 2 == 0))\n\t\t\t\t\tmaze[x + y * 15] = 0;\n\t\t\t\telse\n\t\t\t\t\tmaze[x + y * 15] = wall1;\n\t\t\t}\n\t\t}\n\t\tloadtile(maze, 8, 8, 15, 15);\n\t\tdrawtile(4 ,4);\n\t\tx = 1;\n\t\ty = 1;\n\t\tmaze[x + y * 15] = wall2;\n\t\twhile(generate){\n\t\t\tnextCell();\n\t\t\tdrawtile(4 ,4);\n\t\t\tdelayredraw();\n\t\t}\n\t\tfor(x = 1; x < 14; x++){\n\t\t\tfor(y = 0; y < 14; y++){\n\t\t\t\tif((maze[x + y * 15] == wall1) && (maze[x + (y + 1) * 15] == wall2))\n\t\t\t\t\tmaze[x + y * 15] = wall0;\n\t\t\t}\n\t\t}\n\t\tdrawtile(4 ,4);\n\t\twhile(getkey() != KEY_B){}\n\t\tgenerate = 1;\n\t}\n}\t'],
['platform','char a[] = {0xdd,0xdd,0xdd,0xdd,0xdd,0xdd,0xdd,0xdd,0xd5,0x8d,0x5d,0xdd,0xdd,0xdd,0xdd,0xdd,0xd8,0x8d,0xdd,0xdd,0xdd,0xd5,0xdd,0xd8,0x88,0x8d,0xdd,0xd5,0x88,0xd8,0x88,0xd8,0x88,0x88,0x88,0x88,0x88,0x58,0x88,0x88,0x88,0xd8,0x88,0x88,0x88,0xd8,0x88,0x88,0x88,0x88,0x88,0x58,0x88,0x88,0x88,0x88,0x88,0x88,0x88,0x88,0x88,0x85,0x88,0x88,0x88,0x88,0x58,0x88,0x88,0x88,0x88,0x88,0x88,0x88,0x88,0x88,0x88,0x88,0x88,0x88,0x88,0x8a,0x88,0x88,0x88,0x88,0x88,0x88,0x88,0xa8,0x88,0x88,0xa8,0x88,0x88,0x88,0x88,0x88,0x88,0x88,0x88,0xa8,0x88,0x88,0xa8,0xa8,0xa8,0xa8,0xa8,0xa8,0xa8,0xa8,0x8a,0x8a,0x8a,0x8a,0x8a,0x8a,0x8a,0x8a,0xa0,0xa0,0xa0,0xa0,0xa0,0xa0,0xa0,0xa0};\nchar b[] = {0x99,0x99,0x99,0x99,0x99,0x99,0x99,0x99,0xbb,0x9b,0xbb,0xbb,0xbb,0xbb,0xbb,0xbb,0xab,0x9a,0xaa,0xaa,0xaa,0xaa,0xaa,0xaa,0xab,0x9a,0xaa,0xaa,0xaa,0xaa,0xaa,0xaa,0xab,0x9a,0xaa,0xaa,0xaa,0xaa,0xaa,0xaa,0xab,0x9a,0xaa,0xaa,0xaa,0xaa,0xaa,0xaa,0x99,0x99,0x99,0x99,0x99,0x99,0x99,0x99,0xbb,0xbb,0xbb,0xbb,0xbb,0xb9,0xbb,0xbb,0xaa,0xaa,0xaa,0xaa,0xaa,0xb9,0xaa,0xaa,0xaa,0xaa,0xaa,0xaa,0xaa,0xb9,0xaa,0xaa,0xaa,0xaa,0xaa,0xaa,0xaa,0xb9,0xaa,0xaa,0x99,0x99,0x99,0x99,0x99,0x99,0x99,0x99,0xbb,0xbb,0xbb,0x9b,0xbb,0xbb,0xbb,0xbb,0xaa,0xaa,0xab,0x9a,0xaa,0xaa,0xaa,0xaa,0xaa,0xaa,0xab,0x9a,0xaa,0xaa,0xaa,0xaa,0xaa,0xaa,0xab,0x9a,0xaa,0xaa,0xaa,0xaa};\nchar c[] = {0xb,0xbb,0xbb,0xbb,0xbb,0xbb,0xbb,0xb0,0xbc,0xcc,0xcc,0xcc,0xcc,0xcc,0xcc,0xfb,0xbc,0xc9,0xc9,0xc9,0xc9,0xc9,0xcc,0xfb,0xbc,0xcc,0xcc,0xcc,0xcc,0xcc,0xc9,0xfb,0xbc,0x9c,0xcc,0xcc,0xcc,0xcc,0xcc,0xfb,0xbc,0xcc,0xcc,0xcc,0xcc,0xcc,0xc9,0xfb,0xbc,0x9c,0xcc,0xcc,0xcc,0xcc,0xcc,0xfb,0xbc,0xcc,0xcc,0xcc,0xcc,0xcc,0xc9,0xfb,0xbc,0x9c,0xcc,0xcc,0xcc,0xcc,0xcc,0xfb,0xbc,0xcc,0xcc,0xcc,0xcc,0xcc,0xc9,0xfb,0xbc,0x9c,0xcc,0xcc,0xcc,0xcc,0xcc,0xfb,0xbc,0xcc,0xcc,0xcc,0xcc,0xcc,0xc9,0xfb,0xbc,0x9c,0xcc,0xcc,0xcc,0xcc,0xcc,0xfb,0xbc,0xcc,0x9c,0x9c,0x9c,0x9c,0x9c,0xfb,0xbf,0xff,0xff,0xff,0xff,0xff,0xff,0xfb,0xb,0xbb,0xbb,0xbb,0xbb,0xbb,0xbb,0xb0};\nchar cloud1[] = {0x18,0x22,0x8,0x2a,0x8,0xa2,0x10,0xaa,0x8,0xab,0x8,0xba,0x10,0xbb,0x8,0xb0,0x8,0xb};\nchar cloud2[] = {0x80,0x22};\nchar cloud3[] = {0x1a,0x22,0x84,0x21,0x11,0x12,0x4,0x22,0x82,0x21,0x3,0x11,0x82,0x12,0x3,0x22,0x5,0x11,0x84,0x12,0x22,0x21,0x6,0x11,0x83,0x22,0x21,0x6,0x11,0x83,0x12,0x21,0x7,0x11,0x82,0x22,0x7,0x11,0x83,0x22,0x21,0x5,0x11,0x3,0x22,0x5,0x21,0x21,0x22};\nchar spr0[] = {0x0,0x0,0xbc,0x0,0x0,0x0,0xb,0xbb,0xc0,0x0,0x0,0xb,0x1b,0x10,0x0,0x0,0xb,0xbb,0xc0,0x0,0x0,0xb,0xbb,0xc0,0x70,0x0,0xbb,0xbb,0xb7,0x63,0xb,0xbb,0xbb,0x76,0x63,0xb,0xbb,0xb7,0xb6,0x63,0x6,0xbb,0x7b,0xb6,0x63,0xb,0x67,0xbb,0xb6,0x63,0xb,0x66,0xbb,0xb6,0x63,0x6,0xbb,0xeb,0xbc,0x30,0xb,0xc0,0x0,0xbc,0x0,0xb,0xc0,0x0,0xbc,0x0,0xb,0xc0,0x0,0xbc,0x0,0xb,0xbc,0x0,0xbb,0xc0};\nchar spr1[] = {0x0,0x0,0xbc,0x0,0x0,0x0,0xb,0xbb,0xc0,0x0,0x0,0xb,0x1b,0x10,0x0,0x0,0xb,0xbb,0xc0,0x70,0x0,0xb,0xbb,0xc7,0x0,0x0,0xbb,0xbb,0x7b,0x0,0xb,0xbb,0xb7,0xb6,0x63,0xb,0xbb,0x7b,0xb6,0x63,0x66,0xb7,0xbb,0xb6,0x63,0x6,0x6b,0xbb,0xb6,0x63,0x6,0x6b,0xbb,0xb6,0x63,0x6b,0xb3,0xbb,0xb6,0x63,0x0,0xbc,0xb,0xc0,0x30,0x0,0xbc,0xb,0xc0,0x0,0x0,0xbc,0xb,0xc0,0x0,0x0,0xbb,0xcb,0xbc,0x0};\nint spr[] = {spr0,spr1};\n\n\nint t[] = {\n\t0,0,b,b,0,0,0,0,b,0,0,c,0,0,0,0,0,0,c,0,\n\t0,b,b,b,0,0,0,b,b,0,0,0,0,b,0,0,0,0,0,0,\n\ta,a,a,a,a,a,a,a,a,a,a,a,a,a,0,0,a,a,a,a\n};\nint i,key;\nchar cadr = 0;\n\nvoid scrollscreen(){\n\tif(spritegetvalue(1,S_X) > 80){\n\t\tscroll(1,2);}\n\telse if(spritegetvalue(1,S_X) < 40){\n\t\tscroll(1,0);}\n}\n\nvoid init(){\n\tfor(i = 0; i < 16; i++){\n\t\tputimagerle(cloud2, i * 16, 0, 16, 16);\n\t\tputimagerle(cloud1, i * 16, 16, 16, 13);\n\t}\n\tputimagerle(cloud3, 64, 0, 16, 16);\n\tputimagerle(cloud3, 2, 0, 16, 16);\n\tloadtile(t, 16, 16, 20, 3);\n\tgetsprite(1,spr0);\n\tputsprite(1, 20, 30);\n\tspritesetvalue(1,S_WIDTH,10);\n\tspritesetvalue(1,S_HEIGHT,16);\n\tspritesetvalue(1,S_GRAVITY,1);\n\tspritesetvalue(1,S_SOLID,1);\n\tdrawtile(10 ,70);\n}\n\nvoid main(){\n\tinit();\n\twhile(1){\n\t\tgetsprite(1,spr[cadr]);\n\t\tkey = getkey();\n\t\tif(key & KEY_LEFT){\n\t\t\tspritesetvalue(1,S_SPEEDX,-2);\n\t\t\tcadr = 1 - cadr;\n\t\t}\n\t\telse if(key & KEY_RIGHT){\n\t\t\tspritesetvalue(1,S_SPEEDX,2);\n\t\t\tcadr = 1 - cadr;\n\t\t}\n\t\telse{\n\t\t\tspritesetvalue(1,S_SPEEDX,0);\n\t\t}\n\t\tif(((key & KEY_B) > 0) && (spritegetvalue(1,1) > 50)){  \n\t\t\tif(spritegetvalue(1,S_SPEEDY) == 0){\n\t\t\t\tspritesetvalue(1,S_SPEEDY,-10);\n\t\t\t}\n\t\t}\n\t\tif(spritegetvalue(1,S_Y) > 128){\n\t\t\tclearscreen();\n\t\t\tinit();\n\t\t}\n\t\tscrollscreen();\n\t\tdelayredraw();\n\t} \n}'],
['asteroids','char shatle[] = {0x4,0x0,0x0,0x0,0x0,0x0,0x0,0x1,0x40,0x0,0x0,0x0,0x0,0x0,0x76,0x66,0x66,0x65,0x0,0x0,0x0,0x1,0x11,0x40,0x0,0x0,0x0,0x0,0x1,0x11,0x14,0x44,0x40,0x0,0x0,0x1,0x11,0x11,0x11,0x14,0x44,0x0,0xbb,0xbb,0xbb,0x11,0x11,0xee,0x40,0xcc,0xcc,0xcc,0x11,0x11,0xee,0xf0,0x1,0x11,0x11,0x11,0x1f,0xff,0x0,0x1,0x11,0x1f,0xff,0xf0,0x0,0x0,0x1,0x11,0xf0,0x0,0x0,0x0,0x0,0x76,0x66,0x66,0x65,0x0,0x0,0x0,0x1,0xf0,0x0,0x0,0x0,0x0,0x0,0xf,0x0,0x0,0x0,0x0,0x0,0x0};\nchar bullet[] = {0x77,0x77,0x77,0x22,0x22,0x22};\nchar aster1[] = {0x0,0xf,0xff,0xff,0xff,0x0,0x0,0x0,0x0,0xfc,0xfc,0xcf,0xcc,0xbb,0x0,0x0,0xf,0xcf,0xcf,0xcc,0xcc,0xbc,0xbc,0x0,0xfc,0xfc,0xfc,0xcb,0xfc,0xcb,0xcb,0x0,0xff,0xbf,0xcc,0xcc,0xbf,0xcc,0xbc,0xb0,0xfc,0xfc,0xcc,0xcc,0xcb,0xfc,0xcb,0xb0,0xff,0xcc,0xcc,0xcc,0xcb,0xfc,0xbc,0xb0,0xfc,0xfc,0xcc,0xcc,0xcb,0xfc,0xcb,0xcb,0xff,0xcc,0xbc,0xcc,0xbf,0xcc,0xbc,0xbb,0xfc,0xfc,0xfb,0xbb,0xfc,0xcc,0xcb,0xcb,0xf,0xcc,0xcf,0xff,0xcc,0xcc,0xbc,0xbb,0x0,0xcc,0xcc,0xcc,0xcc,0xcb,0xcb,0xb0,0x0,0xc,0xcc,0xcc,0xcc,0xbc,0xbb,0x0,0x0,0x0,0xcc,0xcb,0xcb,0xcb,0xcb,0x0,0x0,0x0,0xb,0xbc,0xbc,0xbb,0xb0,0x0,0x0,0x0,0x0,0xb,0xbb,0xb0,0x0,0x0};\nchar aster2[] = {0x0,0x0,0x11,0x10,0x0,0x0,0x0,0x11,0x1f,0x11,0x10,0x0,0x11,0xf1,0xf1,0xfb,0x10,0x0,0x11,0x1f,0x1f,0xff,0xbf,0xc0,0x1f,0x11,0xff,0xff,0xff,0xc0,0x11,0xff,0xff,0xbf,0xfc,0xfc,0x1f,0xff,0xbb,0xff,0xcf,0xcc,0xff,0xff,0xff,0xfc,0xfc,0xfc,0xf,0xfc,0xff,0xcf,0xcc,0xc0,0xc,0xcf,0xcf,0xcc,0xc0,0x0,0x0,0xcc,0xcc,0xc0,0x0,0x0,0x0,0x0,0xcc,0x0,0x0,0x0};\n\nint direction;\nint speed;\nchar key,i,count;\n\nvoid newObj(int arr,char x, char y, char w,char h, char l){\n\tchar j;\n\tfor(j = 3; j < 12; j++){\n\t\tif(spritegetvalue(j,S_LIVES) == 0){\n\t\t\tgetsprite(j,arr);\n\t\t\tspritesetvalue(j,S_WIDTH,w);\n\t\t\tspritesetvalue(j,S_HEIGHT,h);\n\t\t\tspritesetvalue(j,S_SPEEDX,0);\n\t\t\tspritesetvalue(j,S_SPEEDY,random(1));\n\t\t\tspritesetvalue(j,S_SOLID,1);\n\t\t\tspritesetvalue(j,S_ANGLE,random(18) * 20);\n\t\t\tspritesetvalue(j,S_LIVES,l);\n\t\t\tputsprite(j,x,y);\n\t\t\treturn;\n\t\t}\n\t}\n}\n\nvoid end();\n\nvoid collisions(){\n\tchar n,x,y;\n\tfor(i = 3; i < 12; i++){\n\t\tif(spritegetvalue(i,S_X) < 0)\n\t\t\tspritesetvalue(i,S_X,127);\n\t\telse if(spritegetvalue(i,S_X) > 127)\n\t\t\tspritesetvalue(i,S_X,0);\n\t\tif(spritegetvalue(i,S_Y) < 0)\n\t\t\tspritesetvalue(i,S_Y,127);\n\t\telse if(spritegetvalue(i,S_Y) > 127)\n\t\t\tspritesetvalue(i,S_Y,0);\n\t}\n\tif(spritegetvalue(2,S_COLLISION) > 2){\n\t\tn = spritegetvalue(2,S_COLLISION);\n\t\tspritesetvalue(2,S_LIVES,0);\n\t\tcount--;\n\t\tif(spritegetvalue(n,S_LIVES) == 2){\n\t\t\tx = spritegetvalue(n,S_X);\n\t\t\ty = spritegetvalue(n,S_Y);\n\t\t\tgetsprite(n,aster2);\n\t\t\tspritesetvalue(n,S_WIDTH,12);\n\t\t\tspritesetvalue(n,S_HEIGHT,12);\n\t\t\tspritesetvalue(n,S_LIVES,1);\n\t\t\tnewObj(aster2, x, y, 12, 12, 1);\n\t\t\tcount += 2;\n\t\t}\n\t\telse\n\t\t\tspritesetvalue(n,S_LIVES,0);\n\t}\n\tif(spritegetvalue(1,S_COLLISION) > 2)\n\t\tend();\n}\n\nvoid init(){\n\tdirection = 0;\n\tspeed = 0;\n\tsetparticle(0,6,200);\n\tgetsprite(1,shatle);\n\tspritesetvalue(1,S_WIDTH,14);\n\tspritesetvalue(1,S_HEIGHT,13);\n\tgetsprite(2,bullet);\n\tspritesetvalue(2,S_WIDTH,6);\n\tspritesetvalue(2,S_HEIGHT,2);\n\tspritesetvalue(2,S_SOLID,1);\n\tfor(i = 3; i < 7; i++){\n\t\tnewObj(aster1, 20 + random(90),random(100), 16, 16, 2);\n\t}\n\tcount = 4;\n\tputsprite(1,10,60);\n}\n\nvoid end(){\n\tfor(i = 3; i < 12; i++){\n\t\tspritesetvalue(i,S_LIVES,0);\n\t}\n\tgotoxy(6,6);\n\tif(count > 0)\n\t\tputs("game  end");\n\telse\n\t\tputs("game  win");\n\twhile(getkey() > 0){};\n\twhile(getkey() == 0){};\n\tclearscreen();\n\tinit();\n}\n\nvoid main(){\ninit();\n\twhile(1){\n\t\tif(spritegetvalue(1,S_X) < 0)\n\t\t\tspritesetvalue(1,S_X,127);\n\t\telse if(spritegetvalue(1,S_X) > 127)\n\t\t\tspritesetvalue(1,S_X,0);\n\t\tif(spritegetvalue(1,S_Y) < 0)\n\t\t\tspritesetvalue(1,S_Y,127);\n\t\telse if(spritegetvalue(1,S_Y) > 127)\n\t\t\tspritesetvalue(1,S_Y,0);\n\t\tcollisions();\n\t\tif(count == 0)\n\t\t\tend();\n\t\tkey = getkey();\n\t\tif(key & KEY_LEFT)\n\t\t\tdirection-=8;\n\t\telse if(key & KEY_RIGHT)\n\t\t\tdirection+=8;\n\t\tif(direction < 0)\n\t\t\tdirection += 360;\n\t\tif(((key & KEY_UP) > 0 || (key & KEY_A) > 0)&& speed < 20)\n\t\t\tspeed++;\n\t\tif((key & KEY_DOWN) > 0){\n\t\t\tif(speed > 8)\n\t\t\t\tspeed--;\n\t\t\telse\n\t\t\t\tspeed=0;\n\t\t}\n\t\tif(key & KEY_B > 0 && spritegetvalue(2,S_LIVES) <= 0){\n\t\t\tspritespeed(2,7,direction);\n\t\t\tspritesetvalue(2,S_ANGLE,direction);\n\t\t\tputsprite(2,spritegetvalue(1,S_X) + 7,spritegetvalue(1,S_Y) + 7);\n\t\t}\n\t\tif((spritegetvalue(2,S_X) < 0) || (spritegetvalue(2,S_X) > 127) \n\t\t\t\t|| (spritegetvalue(2,S_Y) < 0) || (spritegetvalue(2,S_Y) > 127)){\n\t\t\t\t\tspritesetvalue(2,S_LIVES,0);\n\t\t}\n\t\tspritespeed(1,speed/4,direction);\n\t\tspritesetvalue(1,S_ANGLE,direction);\n\t\tsetemitter(50,direction + 130, direction + 210, speed);\n\t\tdrawparticle(spritegetvalue(1,S_X) + 7, spritegetvalue(1,S_Y) + 7, 3);\n\t\tdelayredraw();\n\t}\n}'],
['space','char s1[] = {0x0,0x9,0x90,0x0,0x9,0x9c,0x9c,0xc0,0x99,0xc9,0xcc,0xbb,0x9c,0x9c,0xcb,0xcb,0xc9,0xcc,0xbc,0xbb,0x9c,0xcb,0xcb,0xcb,0xcc,0xbc,0xbc,0xb0,0xb,0xbb,0xbb,0x0};\nchar shatle[] = {0x00,0x01,0x10,0x00,0x00,0x01,0x10,0x00,0x00,0x1e,0xe1,0x00,0x00,0x11,0x11,0x00,0x00,0x01,0x10,0x00,0x00,0x01,0x10,0x00,0xc0,0x11,0x11,0x0c,0x11,0x21,0x12,0x11,0x00};\nchar stars[64];\nchar game[] = {0x11,0x10,0x11,0x10,0x11,0x01,0x10,0x11,0x10,0x00,0x10,0x10,0x10,0x10,0x10,0x10,0x10,0x00,0x11,0x10,0x10,0x10,0x10,0x11,0x10,0x10,0x10,0x10,0x10,0x00,0x10,0x10,0x11,0x10,0x10,0x10,0x10,0x00,0x10,0x11,0x00};\nchar over[] = {0x11,0x10,0x10,0x10,0x11,0x01,0x01,0x10,0x10,0x10,0x10,0x10,0x01,0x10,0x10,0x10,0x10,0x10,0x11,0x01,0x00,0x10,0x10,0x01,0x00,0x10,0x01,0x00,0x11,0x10,0x01,0x00,0x11,0x01,0x00,0x00};\nchar x,y,key,play;\nint  i;\n\nvoid exit(int j){\n\tputsprite(j,random(120),1);\n}\n\nvoid end(int n){\n\tplay = 0;\n}\n\nvoid main()\n{\n\twhile(1){\n\tsetimagesize(1);\n\tclearscreen();\n\tx = 60;\n\ty = 118;\n\tplay = 1;\n\tgetsprite(16,shatle);\n\tspritesetvalue(16,S_ON_COLLISION,end);\n\tfor (i = 0; i < 32; i++){\n\t\tstars[i + 32] = random(120);\n\t\tstars[i] = random(254);\n\t}\n\tfor (i = 0; i < 16; i++){\n\t\tgetsprite(i,s1);\n\t\tspritesetvalue(i,S_ANGLE,random(300));\n\t\tspritesetvalue(i,S_SPEEDY,1+random(2));\n\t\tspritesetvalue(i,S_ON_EXIT_SCREEN,exit);\n\t\tputsprite(i,random(120),random(30));\n\t}\n\twhile(play){\n\t\tfor (i = 0; i < 32; i++){\n\t\t\tsetcolor(0);\n\t\t\tputpixel(stars[i + 32],stars[i]);\n\t\t\tstars[i] = stars[i] + random(8);\n\t\t\tsetcolor(1 + random(3));\n\t\t\tputpixel(stars[i + 32],stars[i]);\n\t\t}\n\t\tkey = getkey();\n\t\tif((key == 4) & (x > 1)){\n\t\t\tx-=2;}\n\t\tif((key == 8) & (x < 119)){\n\t\t\tx+=2;}\n\t\tputsprite(16, x, y);\n\t\tdelayredraw();\n\t}\n\tsetimagesize(3);\n\tputimage(game, 15, 70, 16, 5);\n\tputimage(over, 75, 70, 14, 5);\n\tfor (i = 0; i < 16; i++){\n\t\tspritesetvalue(i,S_LIVES,0);\n\t}\n\twhile(getkey() == 0){}\n\twhile(getkey() != 0){}\n\t}\n}\t\n'],
['flappybird','//16x12\nchar bird[] = {0x0,0x0,0x0,0xbb,0xbb,0xb0,0x0,0x0,0x0,0x0,0xbb,0x11,0xb1,0x1b,0x0,0x0,0x0,0xb,0x11,0x7b,0x11,0x11,0xb0,0x0,0xb,0xbb,0x77,0x7b,0x11,0x14,0x1b,0x0,0xb1,0x11,0xb7,0x7b,0x11,0x14,0x1b,0x0,0xb1,0x11,0x1b,0x77,0xb1,0x11,0x1b,0x0,0xb7,0x11,0x7b,0x77,0x7b,0xbb,0xbb,0xb0,0xb,0x77,0xb7,0x77,0xb2,0x22,0x22,0x2b,0x0,0xbb,0xaa,0xab,0x2b,0xbb,0xbb,0xb0,0x0,0xba,0xaa,0xaa,0xb2,0x22,0x22,0xb0,0x0,0xb,0xba,0xaa,0xab,0xbb,0xbb,0x0,0x0,0x0,0xb,0xbb,0xb0,0x0,0x0,0x0};\n//8x32\nchar tube[] = {0x95,0xdd,0xdd,0x71,0x95,0xdd,0xdd,0x71,0x95,0xdd,0xdd,0x71,0x95,0xdd,0xdd,0x71,0x95,0xdd,0xdd,0x71,0x95,0xdd,0xdd,0x71,0x95,0xdd,0xdd,0x71,0x95,0xdd,0xdd,0x71,0x95,0xdd,0xdd,0x71,0x95,0xdd,0xdd,0x71,0x95,0xdd,0xdd,0x71,0x95,0xdd,0xdd,0x71,0x95,0xdd,0xdd,0x71,0x95,0xdd,0xdd,0x71,0x95,0xdd,0xdd,0x71,0x95,0xdd,0xdd,0x71,0x95,0xdd,0xdd,0x71,0x95,0xdd,0xdd,0x71,0x95,0xdd,0xdd,0x71,0x95,0xdd,0xdd,0x71,0x95,0xdd,0xdd,0x71,0x95,0xdd,0xdd,0x71,0x95,0xdd,0xdd,0x71,0x95,0xdd,0xdd,0x71,0x95,0xdd,0xdd,0x71,0x95,0xdd,0xdd,0x71,0x95,0xdd,0xdd,0x71,0x95,0xdd,0xdd,0x71,0x95,0xdd,0xdd,0x71,0x95,0xdd,0xdd,0x71,0x95,0xdd,0xdd,0x71,0x95,0xdd,0xdd,0x71};\n//16x16 rle\nchar fone[] = {0xb,0x33,0x82,0x11,0x6,0x33,0x3,0x11,0x4,0x33,0x4,0x11,0x85,0x13,0x11,0x33,0x31,0x6,0x11,0x84,0x13,0x11,0x1f,0x3,0xff,0x4,0x11,0x82,0x1f,0x2,0x11,0x82,0x1f,0x4,0x11,0x4,0x1f,0x4,0x11,0x82,0x1f,0x2,0x11,0x83,0x1f,0xff,0x2,0x11,0x85,0x1f,0xff,0x1f,0x99,0x2,0x1f,0x2,0x11,0x2,0x1f,0x85,0x19,0xdd,0x9f,0x1f,0x2,0x11,0x92,0x1f,0x19,0x9d,0xdd,0xd9,0x19,0x99,0x11,0x1f,0x9d,0xdd,0x9d,0xd9,0x9d,0xdd,0x91,0x99,0x3,0xdd,0x82,0x9d,0x2,0xdd,0x82,0xd9,0x6,0xdd,0x82,0x9d,0x9,0xdd};\nchar fone2[] = {0x8,0x99,0x8a,0x55,0x5d,0xdd,0xd5,0x55,0x5d,0xdd,0xd5,0x55,0x2,0xdd,0x2,0x55,0x2,0xdd,0x8a,0x55,0x5d,0xdd,0xd5,0x55,0x5d,0xdd,0xd5,0x55,0x2,0xdd,0x2,0x55,0x2,0xdd,0x2,0x55,0x8,0xbb,0x8,0xcc,0x48,0x77};\n\nchar game,score,i,h;\n\nvoid init();\n\nvoid onexit(){\n\tif(spritegetvalue(1, S_Y) > 127)\n\t\tgame = 0;\n\telse\n\t\tspritesetvalue(1, S_Y, 1);;\n}\n\nvoid tubeOnexit(int n){\n\tif(spritegetvalue(n, S_X) < 0){\n\t\tspritesetvalue(n, S_X, 127);\n\t\tif(spritegetvalue(n, S_Y) < 64)\n\t\t\tspritesetvalue(n, S_HEIGHT, 8 + random(24));\n\t\telse{\n\t\t\th = 8 + random(24);\n\t\t\tspritesetvalue(n, S_HEIGHT, h);\n\t\t\tspritesetvalue(n, S_Y, 112 - h);\n\t\t\tscore++;\n\t\t\tgotoxy(10,7);\n\t\t\tputn(score);\n\t\t}\n\t}\n}\n\nvoid oncollision(){\n\tgame = 0;\n}\n\nvoid init(){\n\tgame = 1;\n\tscore = 0;\n\tsetbgcolor(3);\n\tclearscreen();\n\tgetsprite(1, bird);\n\tspritesetvalue(1, S_WIDTH, 16);\n\tspritesetvalue(1, S_HEIGHT, 12);\n\tspritesetvalue(1, S_SOLID, 1);\n\tspritesetvalue(1, S_GRAVITY, 1);\n\tspritesetvalue(1, S_SPEEDY, -1);\n\tspritesetvalue(1, S_SPEEDX, 0);\n\tspritesetvalue(1, S_ON_EXIT_SCREEN, onexit);\n\tspritesetvalue(1, S_ON_COLLISION, oncollision);\n\tputsprite(1, 5, 60);\n\tfor(i = 0; i < 16; i++){\n\t\tputimagerle(fone2, i * 16, 112, 16, 16);\n\t\tputimagerle(fone, i * 16, 96, 16, 16);\n\t}\n\tfor(i = 2; i < 4; i++){\n\t\tgetsprite(i, tube);\n\t\tspritesetvalue(i, S_WIDTH, 8);\n\t\tspritesetvalue(i, S_HEIGHT, 32);\n\t\tspritesetvalue(i, S_SPEEDX, -3);\n\t\tspritesetvalue(i, S_SPEEDY, 0);\n\t\tspritesetvalue(i, S_SOLID, 1);\n\t\tspritesetvalue(i, S_ON_EXIT_SCREEN, tubeOnexit);\n\t}\n\tputsprite(2, 128,0);\n\tspritesetvalue(2, S_HEIGHT, 8 + random(24));\n\tputsprite(3, 128, 80);\n}\n\nvoid main(){\nwhile(1){\n\tinit();\n\twhile(game){\n\t\tif(getkey())\n\t\t\tspritesetvalue(1, S_SPEEDY, -8);\n\t\tdelayredraw();\n\t}\n\tfor(i = 0; i < 20; i++)\n\t\tdelayredraw();\n\twhile(getkey() == 0){}\n}\n}']
];

function loadExampleList(){
	var lst = document.getElementById("example");
	var str = '';
	for(var i = 0; i < example.length; i++)
		str += '<option value="' + i + '">' + example[i][0] + '</option>';
	lst.innerHTML = str;
}

function loadExample(){
	var lst = document.getElementById("example");
	var doc = document.getElementById("input");
	doc.value = example[lst.value][1];
	lineCount();
}