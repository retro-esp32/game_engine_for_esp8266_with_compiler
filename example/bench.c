char im[] = {0x22,0x22,0x22,0x22,0x24,0x44,0x44,0x42,0x24,0x33,0x33,0x42,0x24,0x36,0x63,0x42,0x24,0x36,0x63,0x42,0x24,0x33,0x33,0x42,0x24,0x44,0x44,0x42,0x22,0x22,0x22,0x22,0x00};
char im1r[] = {0x4,0x22,0x82,0x24,0x2,0x44,0x83,0x42,0x24,0x2,0x33,0x8b,0x42,0x24,0x36,0x63,0x42,0x24,0x36,0x63,0x42,0x24,0x2,0x33,0x83,0x42,0x24,0x2,0x44,0x82,0x42,0x4,0x22,0x00};
char im2r[] = {0x20,0x33,0x00};
int s1, s2, s3, s4, s5, s6;

void main() {
    while (1) {
        settimer(1, 5000);

        for (int i = 0; i < 1000; i++)
            putimage(im, random(232), random(150), 8, 8);

        s1 = 5000 - gettimer(1);
        settimer(1, 5000);

        for (i = 0; i < 1000; i++)
            putimagerle(im1r, random(232), random(150), 8, 8);

        s2 = 5000 - gettimer(1);
        settimer(1, 5000);

        for (i = 0; i < 1000; i++)
            putimagerle(im2r, random(232), random(150), 8, 8);

        s3 = 5000 - gettimer(1);
        setimagesize(3);
        settimer(1, 5000);

        for (int i = 0; i < 1000; i++)
            putimage(im, random(185), random(110), 8, 8);

        s4 = 5000 - gettimer(1);
        settimer(1, 5000);

        for (i = 0; i < 1000; i++)
            putimagerle(im1r, random(185),random(110), 8, 8);

        s5 = 5000 - gettimer(1);
        settimer(1, 5000);

        for (i = 0; i < 1000; i++)
            putimagerle(im2r, random(185), random(110), 8, 8);

        s6 = 5000 - gettimer(1);
        clearscreen();
        gotoxy(0, 12);
        setimagesize(1);
        printf("%d\t%d\t%d\n%d\t%d\t%d", s1, s2, s3, s4, s5, s6);
    }
}