//16x16
char spr[] = {0x96,0x96,0x96,0x96,0x96,0x96,0x96,0x96,0x69,0x69,0x69,0x69,0x69,0x69,0x69,0x69,0x96,0x96,0x96,0x96,0x96,0x96,0x96,0x96,0x69,0x69,0x69,0x69,0x69,0x69,0x69,0x69,0x96,0x96,0x96,0x96,0x96,0x96,0x96,0x96,0x69,0x69,0x69,0x69,0x69,0x69,0x69,0x69,0x96,0x96,0x96,0x96,0x96,0x96,0x96,0x96,0x69,0x69,0x69,0x69,0x69,0x69,0x69,0x69,0x96,0x96,0x96,0x96,0x96,0x96,0x96,0x96,0x69,0x69,0x69,0x69,0x69,0x69,0x69,0x69,0x96,0x96,0x96,0x96,0x96,0x96,0x96,0x96,0x69,0x69,0x69,0x69,0x69,0x69,0x69,0x69,0x96,0x96,0x96,0x96,0x96,0x96,0x96,0x96,0x69,0x69,0x69,0x69,0x69,0x69,0x69,0x69,0x96,0x96,0x96,0x96,0x96,0x96,0x96,0x96,0x69,0x69,0x69,0x69,0x69,0x69,0x69,0x69};
//4x55
char chr[] = {0x11,0x16,0x16,0x16,0x16,0x16,0x16,0x16,0x11,0x16,0x66,0x16,0x66,0x16,0x66,0x16,0x66,0x16,0x66,0x16,0x11,0x16,0x66,0x16,0x11,0x16,0x16,0x66,0x11,0x16,0x11,0x16,0x66,0x16,0x61,0x16,0x66,0x16,0x11,0x16,0x16,0x16,0x16,0x16,0x11,0x16,0x66,0x16,0x66,0x16,0x11,0x16,0x16,0x66,0x11,0x16,0x66,0x16,0x11,0x16,0x11,0x16,0x16,0x66,0x11,0x16,0x16,0x16,0x11,0x16,0x11,0x16,0x66,0x16,0x66,0x16,0x66,0x16,0x66,0x16,0x11,0x16,0x16,0x16,0x11,0x16,0x16,0x16,0x11,0x16,0x11,0x16,0x16,0x16,0x11,0x16,0x66,0x16,0x11,0x16,0x66,0x66,0x66,0x66,0x66,0x66,0x66,0x66,0x66,0x66};

void chartosprite(int x, int y, int n){
	int i,j;
	for(i = 0; i < 2; i++)
		for(j = 0; j < 5; j++)
			spr[x + i + (y + j) * 8] = chr[n * 10 + i + j * 2];
}

void printtosprite(int x, int y, int n){
	int i;
	for(i = 3; i >= 0; i--){
		chartosprite(x + i * 2, y, n % 10); 
		n = n / 10;
	}
}

void main(){
	putimage(spr,1,60,16,16);
	printtosprite(0,2,1234);
	printtosprite(0,9,5678);
	putimage(spr,40,60,16,16);
	putimage(spr,40,60,16,16);
	putimage(spr,50,70,16,16);
	setimagesize(3);
	putimage(spr,0,0,16,16);
}	