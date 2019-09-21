char s0[] = {0x0, 0x0, 0x0, 0x66, 0x66, 0x0, 0x0, 0x0, 0x0, 0x0, 0x66, 0x77, 0x77, 0x66, 0x0, 0x0, 0x0, 0x6, 0x77, 0x8f,
             0xc8, 0x88, 0x60, 0x0, 0x0, 0x67, 0x88, 0x8f, 0xc8, 0x88, 0x86, 0x0, 0x6, 0x78, 0x88, 0x8f, 0xc8, 0x88,
             0x88, 0x60, 0x6, 0x78, 0x88, 0x8f, 0xc8, 0x88, 0x88, 0x60, 0x67, 0x88, 0x88, 0xfc, 0xcc, 0x88, 0x88, 0xb6,
             0x67, 0xff, 0xff, 0xcc, 0xcc, 0xcc, 0xcc, 0xb6, 0x67, 0xcc, 0xcc, 0xcc, 0xcc, 0xbb, 0xbb, 0xb6, 0x67, 0x88,
             0x88, 0xcc, 0xcb, 0x88, 0x88, 0xb6, 0x6, 0x88, 0x88, 0x8c, 0xb8, 0x88, 0x8b, 0x60, 0x6, 0x88, 0x88, 0x8c,
             0xb8, 0x88, 0x8b, 0x60, 0x0, 0x68, 0x88, 0x8c, 0xb8, 0x88, 0xb6, 0x0, 0x0, 0x6, 0x88, 0x8c, 0xb8, 0xbb,
             0x60, 0x0, 0x0, 0x0, 0x66, 0xbb, 0xbb, 0x66, 0x0, 0x0, 0x0, 0x0, 0x0, 0x66, 0x66, 0x0, 0x0, 0x0, 0x00};
char bl[] = {0x99, 0x99, 0x99, 0x99, 0xcc, 0xcb, 0x9c, 0xcc, 0xff, 0xcb, 0x9f, 0xff, 0xff, 0xfb, 0x9f, 0xff, 0x99, 0x99,
             0x99, 0x99, 0xcc, 0xcc, 0xcc, 0xb9, 0xff, 0xff, 0xfc, 0xb9, 0xff, 0xff, 0xff, 0xb9, 0x00};
char b2[] = {0x9, 0x99, 0x99, 0x0, 0x9, 0xcc, 0xb9, 0x0, 0x9, 0xfc, 0xb9, 0x0, 0x9, 0xff, 0xb9, 0x0, 0x99, 0x99, 0x99,
             0x99, 0xcc, 0xcc, 0xcc, 0xb9, 0xff, 0xff, 0xfc, 0xb9, 0xff, 0xff, 0xff, 0xb9, 0x00};
char j, x;
int a = 0;

void main() {
    setimagesize(2);

    for (x = 0; x < 17; x++) {
        putimage(b2, x * 16, 192, 8, 8);
        putimage(bl, x * 16, 208, 8, 8);
        putimage(bl, x * 16, 224, 8, 8);
    }

    for (j = 0; j < 32; j++) {
        getsprite(j, s0);
        putsprite(j, random(232), random(232)); // SH
        spritespeedx(j, -4);
        spritespeedy(j, 2);
        spritesetvalue(j, 4, 16);
        spritesetvalue(j, 5, 16);
        spritesetvalue(j, 9, 1);
    }

//gravity, time, count
    setparticle(1, 4, 2000);
//time, dir, dir1, speed
    setemitter(190, 220, 0, 9);
    setimagesize(2);

    while (1) {
        scroll(1, 2);
        a++;
        drawparticle(120, 120, a); // SH

        for (j = 0; j < 32; j++) {
            spritesetvalue(j, 6, a);

            if (spritegetvalue(j, 0) < 2) {
                spritespeedx(j, 4);
            }

            if (spritegetvalue(j, 0) > 230) { // SH
                spritespeedx(j, -4);
            }

            if (spritegetvalue(j, 1) < 2) {
                spritespeedy(j, 2);
            }

            if (spritegetvalue(j, 1) > 230) { // SH
                spritespeedy(j, 0 - 2);
            }
        }

        gotoxy(12, 2);
        printf(" key pressed %d ", getkey());
        delayredraw();
    }
}