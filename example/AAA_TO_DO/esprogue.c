//16x16
char wall0[] = {0x99,0x99,0x99,0x99,0xbb,0xb9,0x99,0x99,0xaa,0xa9,0xaa,0x8a,0xaa,0xba,0x88,0xa9,0xaa,0xa9,0xaa,0xa8,0xaa,0x9a,0xaa,0xa9,0x99,0x99,0x99,0xaa,0xa9,0x99,0x99,0x99,0x9a,0xaa,0xab,0xbb,0xbb,0xaa,0xa9,0x99,0x9a,0x8a,0xaa,0x99,0xaa,0xaa,0xa9,0x99,0xb9,0x99,0x99,0x99,0x99,0x99,0x9b,0xbb,0xbb,0xbb,0xbb,0xbb,0xbb,0xbb,0xbb,0xbb,0x8a,0x89,0x8a,0x8a,0x8a,0xca,0x88,0x89,0x9c,0x9c,0x9c,0x9c,0x9c,0x9c,0x9c,0x9c,0xcb,0xca,0x8a,0x8a,0xc9,0xca,0x8a,0xc9,0x9c,0x9c,0x9c,0x9c,0x9c,0x9c,0x9c,0x9c,0x8a,0xc9,0xc9,0xc9,0xc9,0xca,0x89,0xc9,0x9c,0x9c,0xa8,0xa8,0xac,0x9c,0x9c,0xa8,0x69,0x69,0x69,0x69,0x69,0x69,0x69,0x69,0xcb,0xc6,0x96,0x96,0xcb,0xcb,0xc6,0x96};
char wall1[] = {0x99,0x99,0x99,0x99,0xbb,0xb9,0x99,0x99,0xaa,0xa9,0xaa,0x8a,0xaa,0xba,0x88,0xa9,0xaa,0xa9,0xaa,0xa8,0xaa,0x9a,0xaa,0xa9,0x99,0x99,0x99,0xaa,0xa9,0x99,0x99,0x99,0x9a,0xaa,0xab,0xbb,0xbb,0xaa,0xa9,0x99,0x9a,0x8a,0xaa,0x99,0xaa,0xaa,0xa9,0x99,0xb9,0x99,0x99,0x99,0x99,0x99,0x9b,0xbb,0xaa,0xa9,0xaa,0xa8,0x89,0x9a,0xaa,0xa9,0xaa,0xa9,0xba,0xaa,0xaa,0x9a,0xa8,0xa9,0x99,0x99,0x99,0x99,0x99,0x99,0x99,0x99,0x9b,0xaa,0xaa,0xaa,0x99,0xba,0xaa,0x99,0x9a,0xaa,0xaa,0xab,0xb9,0xaa,0xaa,0x99,0x98,0x89,0x99,0x99,0x99,0x99,0x99,0x99,0x99,0x99,0xa9,0xaa,0xa9,0x99,0x9b,0xa8,0xa8,0xaa,0xa9,0xa8,0xaa,0x8a,0x99,0xaa,0xaa,0xab,0x99,0x99,0xaa,0xaa,0xa9,0x99};
char floor[] = {0x11,0x11,0x1f,0x11,0x11,0x1f,0x11,0x11,0x11,0x11,0x1f,0x11,0x11,0x1f,0x11,0x11,0x11,0x11,0x1f,0x11,0x11,0xf1,0x11,0x11,0x11,0xff,0xff,0x11,0x11,0xf1,0x11,0x11,0xff,0xf1,0x1f,0x11,0x11,0xf1,0x11,0x11,0x11,0xf1,0x1f,0xff,0xff,0xff,0xff,0xff,0x11,0xf1,0x11,0x1f,0x11,0x11,0xf1,0x11,0x11,0xff,0xff,0xff,0x11,0x11,0xf1,0x11,0x11,0x11,0x11,0xf1,0x11,0x11,0xf1,0x11,0x11,0x11,0x11,0xf1,0x11,0x11,0xf1,0x11,0x11,0x11,0x1f,0x11,0x11,0x11,0xf1,0x11,0x11,0x11,0x1f,0xff,0xff,0xff,0xf1,0x11,0x11,0x1f,0xf1,0x11,0xf1,0x11,0xff,0x11,0xff,0xff,0x11,0x11,0xf1,0x11,0x11,0xff,0x11,0x11,0xf1,0x11,0xff,0xf1,0x11,0x11,0x11,0x11,0xff,0xff,0xf1,0x1f,0x11,0x11};
char door[] = {0x99,0x99,0x99,0x99,0x99,0x99,0x99,0x99,0x97,0x77,0x7f,0x8f,0x8f,0x8f,0x8f,0x8f,0x97,0xaa,0x78,0xf8,0xf8,0xf8,0xf8,0xf8,0x7a,0xaa,0x7c,0x8c,0x8c,0x8c,0x8c,0x8c,0x97,0xaa,0x77,0x77,0x78,0xc8,0xc8,0xc8,0x7a,0xaa,0x7c,0xaa,0x7c,0xac,0xac,0xac,0x97,0xaa,0x7a,0xaa,0x7a,0xca,0xca,0xca,0x7a,0xaa,0x7c,0xaa,0x77,0x77,0x8b,0xab,0x97,0xaa,0x7a,0xaa,0x7c,0xaa,0x7c,0xbc,0x7a,0xaa,0x7c,0xaa,0x7a,0xaa,0x8b,0xcb,0x97,0xaa,0x7a,0xaa,0x7c,0xaa,0x78,0x88,0x7a,0xaa,0x7c,0xaa,0x7a,0xaa,0x8c,0xab,0x97,0xaa,0x7a,0xaa,0x7c,0xaa,0x7a,0xba,0x7a,0xaa,0x7a,0xaa,0x7a,0xaa,0x8c,0xab,0x97,0xaa,0x7c,0xaa,0x7c,0xaa,0x7a,0xba,0x99,0x99,0x99,0x99,0x99,0x99,0x99,0x99};
//14x16
char hero0[] = {0x0,0x3,0x0,0x33,0x36,0x0,0x30,0x0,0x3,0x3,0x8f,0xcb,0x60,0x30,0x0,0x0,0x38,0xff,0xfc,0xb6,0x0,0x0,0x0,0x8f,0xbf,0xb9,0xcb,0x0,0x0,0x1,0x38,0xff,0xfc,0x9b,0x0,0x0,0x16,0x13,0x8f,0x33,0x33,0x6b,0x0,0x16,0x18,0xf8,0x36,0x66,0x36,0x0,0x16,0x18,0x8f,0x36,0x66,0x6b,0x0,0x16,0x18,0xf8,0x36,0x66,0x36,0x0,0x16,0x1f,0xff,0x36,0x66,0x6b,0x7,0x77,0x77,0xff,0x36,0x66,0x36,0x0,0x33,0x68,0xbf,0xb3,0x63,0x60,0x0,0x33,0x68,0xfb,0xfb,0x36,0xb0,0x0,0x7,0x8,0xb0,0x0,0xb,0xb0,0x0,0x0,0x3,0x60,0x0,0x3,0x60,0x0,0x0,0x33,0x36,0x0,0x0,0x0};
char hero1[] = {0x0,0x3,0x0,0x33,0x36,0x0,0x30,0x0,0x3,0x3,0x8f,0xcb,0x60,0x30,0x0,0x0,0x38,0xff,0xfc,0xb6,0x0,0x0,0x1,0x8f,0xbf,0xb9,0xcb,0x0,0x0,0x16,0x18,0xff,0xfc,0x9b,0x0,0x0,0x16,0x13,0x8f,0xc9,0xcb,0x0,0x0,0x16,0x18,0xf8,0x33,0x33,0xb6,0x0,0x16,0x18,0x8f,0x36,0x66,0x3b,0x0,0x16,0x18,0xf8,0x36,0x66,0xb6,0x7,0x77,0x77,0xff,0x36,0x66,0x3b,0x0,0x33,0x68,0xff,0x36,0x66,0xb6,0x0,0x33,0x68,0xbf,0x36,0x66,0x30,0x0,0x7,0x68,0xfb,0xf3,0x63,0xb0,0x0,0x0,0x8,0xb0,0x0,0x3b,0xb0,0x0,0x0,0x3,0x60,0x0,0x3,0x60,0x0,0x0,0x0,0x0,0x0,0x33,0x36};
int hero[] = {hero0, hero1};
//10x16
char goblin0[] = {0xb5,0xbb,0xbb,0xdb,0x0,0xb,0x55,0x5d,0xb0,0x0,0xb,0x25,0x2d,0xb0,0x0,0x20,0xb5,0x5b,0x0,0x0,0x22,0xb,0x5b,0x0,0x0,0x30,0x0,0xbd,0xb0,0x0,0x95,0x5b,0x55,0xdb,0xb0,0x9b,0xb5,0x55,0x55,0xdb,0x30,0xb9,0x55,0x5d,0xbd,0x30,0xb,0xbb,0x5b,0xbd,0x30,0x0,0xb,0x5b,0x0,0x30,0x0,0xb5,0x5d,0xb0,0x30,0xb,0x5b,0xbb,0xdb,0x30,0xb,0x5b,0xb,0xdb,0x0,0xb,0x5b,0x0,0xb0,0x0,0xb,0x9b,0x0,0x0};
char goblin1[] = {0x5,0xbb,0xbb,0xd0,0x0,0xb5,0x55,0x5d,0xdb,0x0,0xb,0x25,0x2d,0xb0,0x0,0xb,0x55,0x5b,0x0,0x0,0x20,0xbb,0x5b,0x0,0x0,0x22,0x0,0xbd,0xb0,0xb,0x3b,0x5b,0x55,0xdb,0xbd,0x95,0xb5,0x55,0x55,0xdb,0x3b,0xb9,0x55,0x5d,0xb0,0x30,0xb,0xbb,0x5b,0xb0,0x30,0x0,0xb,0x5b,0x0,0x30,0x0,0xb5,0x5d,0xb0,0x30,0xb,0x5b,0xbb,0xdb,0x30,0xb,0x5b,0xb,0xdb,0x30,0x0,0xb0,0xb,0xdb,0x0,0x0,0x0,0xb,0x9b};
int goblin[] = {goblin0, goblin1};
//10x16
char bat0[] = {0x6b,0xb,0x0,0xb0,0xb6,0x6b,0xb6,0xbb,0x6b,0xb6,0x66,0xb6,0x66,0x6b,0x66,0x66,0xb2,0x66,0x2b,0x66,0x66,0x6b,0x69,0xb6,0x66,0xb6,0x66,0x96,0xc6,0x6b,0x6,0x69,0x69,0x66,0x60,0xb,0x66,0x96,0xc6,0xb0,0x0,0xb9,0x69,0x6b,0x0,0x0,0x6,0x96,0xc0,0x0,0x0,0x6,0x0,0x60,0x0,0x0,0x6,0x0,0x60,0x0,0xb,0xb6,0xb0,0x60,0xb0,0xb2,0x62,0x2b,0x6b,0x7b,0xb,0xbb,0x22,0x26,0x77,0x0,0x0,0xbb,0xbb,0x7b};
char bat1[] = {0x0,0xb6,0xbb,0x6b,0x0,0x0,0xb6,0x66,0x6b,0x0,0x0,0xb2,0x66,0x2b,0x0,0xb,0x6b,0x69,0xb6,0xb0,0xb6,0x66,0x96,0xc6,0x6b,0xb6,0x69,0x69,0x66,0x6b,0x66,0x66,0x96,0xc6,0x66,0x66,0x69,0x69,0x66,0x66,0x66,0xb6,0x96,0xcb,0x66,0x6b,0x6,0x0,0x60,0xb6,0xb0,0x6,0x0,0x60,0xb,0x0,0x6,0x0,0x60,0xb0,0xb,0xb6,0xbb,0x6b,0x7b,0xb2,0x62,0x22,0x26,0x77,0xb,0xbb,0xbb,0xbb,0x7b,0x0,0x0,0x0,0x0,0xb0};
int bat[] = {bat0, bat1};
//10x16
char snake0[] = {0x0,0xb,0xbb,0x0,0x0,0x0,0xb5,0x55,0xbb,0x0,0xb,0x5b,0xbb,0x52,0xb0,0xb5,0xb0,0xb,0x25,0xb0,0xb5,0xb0,0x0,0xbb,0x0,0xb5,0xb0,0x0,0x0,0x0,0xb5,0xb0,0x0,0x0,0x0,0xb,0x5b,0xbb,0x0,0x0,0x0,0xb5,0x55,0xb0,0x0,0x0,0xb,0xbb,0x5b,0x0,0x0,0x0,0x0,0xb5,0xb0,0x0,0x0,0x0,0xb5,0xb0,0x0,0xbb,0xbb,0x5b,0x0,0xb,0x55,0x55,0xb0,0xb0,0xbd,0xbb,0xbb,0xbb,0xdb,0xb,0xdd,0xdd,0xdd,0xb0};
char snake1[] = {0x0,0x0,0xb,0xbb,0x0,0x0,0x0,0xb5,0x55,0xb0,0x0,0xb,0x5b,0x55,0x5b,0x0,0xb5,0xbb,0x25,0x2b,0xb,0x5b,0xb,0x55,0x5b,0xb,0x5b,0x0,0xb6,0xb0,0xb,0x5b,0x0,0x6,0x0,0xb,0x5b,0xb0,0x60,0x60,0x0,0xb5,0x5b,0x0,0x0,0x0,0xb,0xb5,0xb0,0x0,0x0,0x0,0xb,0x5b,0x0,0x0,0x0,0xb,0x5b,0x0,0x0,0xbb,0xbb,0x5b,0x0,0xb,0x55,0x55,0xb0,0xb0,0xbd,0xbb,0xbb,0xbb,0xdb,0xb,0xdd,0xdd,0xdd,0xb0};	
int snake[] = {snake0, snake1};
//32x16
char gui[] = {0x6,0x66,0x66,0x66,0x66,0x66,0x66,0x66,0x66,0x66,0x66,0x66,0x66,0x66,0x66,0x60,0x62,0x26,0x22,0x66,0x66,0x66,0x66,0x66,0x66,0x66,0x66,0x66,0x66,0x66,0x66,0x66,0x62,0x22,0x22,0x66,0x66,0x66,0x66,0x66,0x66,0x66,0x66,0x66,0x66,0x66,0x66,0x66,0x62,0x22,0x22,0x66,0x66,0x66,0x66,0x66,0x66,0x66,0x66,0x66,0x66,0x66,0x66,0x66,0x66,0x22,0x26,0x66,0x66,0x66,0x66,0x66,0x66,0x66,0x66,0x66,0x66,0x66,0x66,0x66,0x66,0x62,0x66,0x66,0x66,0x66,0x66,0x66,0x66,0x66,0x66,0x66,0x66,0x66,0x66,0x66,0x66,0x66,0x66,0x66,0x66,0x66,0x66,0x66,0x66,0x66,0x66,0x66,0x66,0x66,0x66,0x66,0x66,0x66,0x66,0x66,0x66,0x66,0x66,0x66,0x66,0x66,0x66,0x66,0x66,0x66,0x66,0x66, 0x66,0x66,0x66,0x66,0x66,0x66,0x66,0x66,0x66,0x66,0x66,0x66,0x66,0x66,0x66,0x66,0x66,0x66,0x61,0xc6,0x66,0x66,0x66,0x66,0x66,0x66,0x66,0x66,0x66,0x66,0x66,0x66,0x66,0x66,0x1c,0x66,0x66,0x66,0x66,0x66,0x66,0x66,0x66,0x66,0x66,0x66,0x66,0x66,0x61,0x61,0xc6,0x66,0x66,0x66,0x66,0x66,0x66,0x66,0x66,0x66,0x66,0x66,0x66,0x66,0x66,0x1c,0x66,0x66,0x66,0x66,0x66,0x66,0x66,0x66,0x66,0x66,0x66,0x66,0x66,0x66,0x61,0x61,0xc6,0x66,0x66,0x66,0x66,0x66,0x66,0x66,0x66,0x66,0x66,0x66,0x66,0x66,0x66,0x66,0x66,0x66,0x66,0x66,0x66,0x66,0x66,0x66,0x66,0x66,0x66,0x66,0x66,0x66,0x6,0x66,0x66,0x66,0x66,0x66,0x66,0x66,0x66,0x66,0x66,0x66,0x66,0x66,0x66,0x60};
//4x55
char guichr[] = {0x11,0x16,0x16,0x16,0x16,0x16,0x16,0x16,0x11,0x16,0x66,0x16,0x66,0x16,0x66,0x16,0x66,0x16,0x66,0x16,0x11,0x16,0x66,0x16,0x11,0x16,0x16,0x66,0x11,0x16,0x11,0x16,0x66,0x16,0x61,0x16,0x66,0x16,0x11,0x16,0x16,0x16,0x16,0x16,0x11,0x16,0x66,0x16,0x66,0x16,0x11,0x16,0x16,0x66,0x11,0x16,0x66,0x16,0x11,0x16,0x11,0x16,0x16,0x66,0x11,0x16,0x16,0x16,0x11,0x16,0x11,0x16,0x66,0x16,0x66,0x16,0x66,0x16,0x66,0x16,0x11,0x16,0x16,0x16,0x11,0x16,0x16,0x16,0x11,0x16,0x11,0x16,0x16,0x16,0x11,0x16,0x66,0x16,0x11,0x16,0x66,0x66,0x66,0x66,0x66,0x66,0x66,0x66,0x66,0x66};
//6x17
char guihpoison[] = {0x66,0x66,0x66,0x66,0x87,0x66,0x62,0x22,0xa6,0x62,0x22,0xa6,0x66,0x66,0x66,0x66,0x87,0x66,0x62,0x22,0xa6,0x62,0x22,0xa6,0x66,0x66,0x66,0x66,0x87,0x66,0x62,0x22,0xa6,0x62,0x22,0xa6,0x66,0x66,0x66,0x66,0x87,0x66,0x62,0x22,0xa6,0x62,0x22,0xa6,0x66,0x66,0x66};
//64x32
char startscreen[] = {0x54,00,00,00,0x40,00,0x20,0x2a,0xa8,00,00,00,0xa3,0xf8,0x50,0x15,0x50,00,00,00,0xa4,0x54,0x50,0xa,0xa0,0x1,0x10,0x40,0xa8,0x2a,0x50,0x5,0x45,0x80,0xe3,0x80,0x90,0x15,0x50,0x2,0xa2,0x7,0xff,0xe0,0x40,0x2,0x90,0x5,0x42,0x6,00,0x60,0x20,0x1,0x60,0x2,0x81,0x3d,00,0xa8,0x23,0xba,0xc0,0x1,0x4b,0xc4,0x9d,0x30,0x23,0x19,0x80,0x2,0x84,0x25,0x62,0xb0,0x20,0x2,0x80,0x1,0x4,0x24,0x54,0xac,0xa0,0x1,0x60,00,0xc,0x5f,0x2c,0xf1,0x50,0x3f,0xfc,00,0x2,0xf4,0xbb,0x21,0x2c,0x20,0x2c,00,0x1,0xd,0x7d,0xb1,0x2b,0xe0,0x14,00,0x1,0xd,0xbe,0xad,0x2c,0x20,0x2c,00,00,0xf5,0x7d,0xb1,0x28,0x20,0x1c,00,0xb,0xdd,0xbe,0xb1,0x2c,0x20,0x24,00,0x4,0x25,0x7f,0x2d,0x28,0x20,0x1c,00,0x4,0x25,0xbd,0xb1,0x2c,0x20,0x2c,00,0x4,0x26,0x7e,0x61,0x28,0x20,0x14,00,0xb,0x5d,0x4a,0xa1,0x2c,0x20,0x2c,00,00,0xf4,0xbd,0x27,0xff,0xe0,0x1c,00,0x81,0xd,00,0xa8,0x4,0x20,0x24,0x1,0x42,0xe,00,0x62,0x14,0x10,0x18,0x2,0x81,0xf7,0xff,0xe2,0x34,0x8,0x18,0x1,0x40,0x3,0x6d,0xa2,0x14,0xbc,0x28,0x2,0xa0,0x25,0x55,0x52,0x35,0x43,0xd8,0x5,0x40,0x8a,0xaa,0xa1,0xe4,0x81,0x28,0x2,0xa2,0x24,0x92,0x49,0x49,0x81,0x18,0x5,0x50,00,00,00,0x88,0x81,0x28,0xa,0xaa,00,00,00,0x31,0x41,0x18,0x55,0x55,00,00,00,0x7f,0xe0,0xf0,0xaa};
//64x24
char endscreen[] = {00,00,00,00,00,0x3,0x80,00,00,00,00,00,00,0x4,0x40,00,00,00,00,00,00,0x2,0x80,00,00,00,00,00,00,0x2,0x80,00,00,00,00,00,00,0x2,0x80,00,00,00,00,00,00,0x2,0x80,00,00,0x7f,0xc7,0xff,0xf3,0xfe,0x80,00,00,0xaa,0xa4,0x4,0x12,0x2,0x80,00,0x1,0x55,0x54,00,0xa,0x2,0x80,0xe0,0x2,0xa8,0x8,00,0x4,0x2,0xff,0x10,0x5,0x40,00,00,00,0x2,0xa4,0x90,0x8,00,0x3,0xfc,0xff,0xfa,0x92,0x48,0x4,00,00,00,00,0x2,0xa4,0x90,0x2,00,00,00,00,0x2,0xff,0x10,0x1,0x2,00,00,00,0x2,0x80,0xe0,00,0x85,0x4,0x3,00,0x42,0x80,00,00,0x7d,0xff,0xfc,0xff,0xfe,0x80,00,00,00,00,00,00,0x2,0x80,00,00,00,00,00,00,0x2,0x80,00,00,00,00,00,00,0x2,0x80,00,00,00,00,00,00,0x2,0x80,00,00,00,00,00,00,0x4,0x40,00,00,00,00,00,00,0x3,0x80,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00};

int maze[441];
char stack[441];
char stackpoint = 0;

int x, y, offsetx, offsety, i, j, isDoor, isMaze, cadr, key, prevkey, level;
int health, maxhealth, attack, block, shield, sword, armor, hpoison, gold;

char shieldname[9];
char swordname[9];
char armorname[9];
char newname[9];
char generate = 1;
int s[4];
//length 123
char names[] = "bagbilbobbomboncamcapcedcogcobdoddogdotelmennfarfulgonhamhaljacjasjoclaclillobludmadmagmanmaymermulnagneloldriprobsamtaytom";

void delay(int t) {
	settimer(0, t);

	while (gettimer(0) != 0) {
    };
}

void fRect(int rx1, int ry1, int rx2, int ry2) {
	int ri;

	for (ri = ry1; ri < ry2; ri++)
        line(rx1, ri, rx2, ri);
}

void chartosprite(int x, int y, int n) {
	int i, j;

	for (i = 0; i < 2; i++)
		for (j = 0; j < 5; j++)
			gui[x + i + (y + j) * 16] = guichr[n * 10 + i + j * 2];
}

void printtosprite(int x, int y, int n) {
	int i;

	for (i = 4; i >= 0; i--) {
		chartosprite(x + i * 2, y, n % 10); 
		n = n / 10;
	}
}

char randomCell() {
	char n = random(3);

	if (x == 1)
		s[2] = 1;
	else
		s[2] = maze[x - 2 + y * 21];

	if (x == 19)
		s[0] = 1;
	else
		s[0] = maze[x + 2 + y * 21];

	if (y == 1)
		s[1] = 1;
	else
		s[1] = maze[x + (y - 2) * 21];

	if (y == 19)
		s[3] = 1;
	else
		s[3] = maze[x + (y + 2) * 21];

	if (s[n] != 0) {
		i = 8;

		while (i) {
			n++;

			if (n > 3)
				n = 0;

			if (s[n] == 0)
				return n;

			i--;
		}
	} else
		return n;

	return 4;
}

void nextCell() {
	char n = randomCell();

	if (n == 0) {
		x++;
		maze[x + y * 21] = floor;
		x++;
		maze[x + y * 21] = floor;
	} else if (n == 1) {
		y--;
		maze[x + y * 21] = floor;
		y--;
		maze[x + y * 21] = floor;
	} else if (n == 2) {
		x--;
		maze[x + y * 21] = floor;
		x--;
		maze[x + y * 21] = floor;
	} else if (n == 3) {
		y++;
		maze[x + y * 21] = floor;
		y++;
		maze[x + y * 21] = floor;
	}

	if (n == 4) {
		if (isDoor) {
			maze[x + y * 21] = door;
			isDoor = 0;
		}

		if (stackpoint < 2) {
			generate = 0;
			return;
		}

		stackpoint--;
		y = stack[stackpoint];
		stackpoint--;
		x = stack[stackpoint];
	} else {
		stack[stackpoint] = x;
		stackpoint++;
		stack[stackpoint] = y;
		stackpoint++;
	}
}

void generateMaze() {
	int r;
	isDoor = 1;

	for (x = 0; x < 21; x++) {
		for (y = 0; y < 21; y++) {
			if (((x + 1) % 2 == 0) & ((y + 1) % 2 == 0))
				maze[x + y * 21] = 0;
			else
				maze[x + y * 21] = wall1;
		}
	}

	x = 1;
	y = 1;
	maze[x + y * 21] = floor;

	while (generate)
		nextCell();

	for (x = 1; x < 20; x++) {
		for (y = 0; y < 20; y++) {
			if ((maze[x + y * 21] == wall1) && (maze[x + (y + 1) * 21] == floor || maze[x + (y + 1) * 21] == door)) {
				maze[x + y * 21] = wall0;
			}
		}
	}

	generate = 1;
	isMaze = 1;
	x = 1;
	y = 1;
	offsety = 0;
	offsetx = 0;
	j = 2;

	for (i = 0; i < 100; i++) {
		r = 23 + random(397);

		if (maze[r] == floor) {
			putsprite(j, (r % 21) * 16 + 3, (r / 21) * 16);
			spritesetvalue(j, S_LIVES, level + random(1));
			j++;

			if (j == 11)
				return;
		}
	}
}

void nextCadr() {
	int sx, sy;
	sx = spritegetvalue(1, S_X);
	sy = spritegetvalue(1, S_Y);

	if (gettimer(0) == 0) {
		settimer(0, 300);
		cadr = 1 - cadr;
		getsprite(1, hero[cadr]);
		getsprite(2, goblin[cadr]);
		getsprite(3, goblin[cadr]);
		getsprite(4, goblin[cadr]);
		getsprite(5, bat[cadr]);
		getsprite(6, bat[cadr]);
		getsprite(7, bat[cadr]);
		getsprite(8, snake[cadr]);
		getsprite(9, snake[cadr]);
		getsprite(10, snake[cadr]);
	}

	if (sx > 64 && offsetx >= (-208)) {
		offsetx -= 2;
		scroll(2);
	} else if (sx < 48 && offsetx < (-4)) {
		offsetx += 2;
		scroll(0);
	} else if (sy > 64 && offsety >= (-210)) {
		offsety -= 2;
		scroll(1);
		scroll(1);
	} else if (sy < 48 && offsety < (-6)) {
		offsety += 2;
		scroll(3);
		scroll(3);
	}
}

void init() {
	setbgcolor(1);
	setcolor(9);
	clearscreen();
	setimagesize(2);
	putimage1bit(startscreen, 0, 16, 64, 32);
	setimagesize(1);
	gotoxy(4, 11);
	printf("Press any key to start the game.");

	while (getkey() == 0) {
    }

	getsprite(1, hero1);
	spritesetvalue(1, S_WIDTH, 14);
	spritesetvalue(1, S_HEIGHT,16);
	putsprite(1, 17, 16);
	getsprite(2, goblin);
	getsprite(3, goblin);
	getsprite(4, goblin);
	getsprite(5, bat);
	getsprite(6, bat);
	getsprite(7, bat);

	for (i = 2; i < 16; i++) {
		spritesetvalue(i, S_WIDTH, 10);
		spritesetvalue(i, S_HEIGHT,16);	
	}

	getsprite(30, guihpoison);
	spritesetvalue(30, S_WIDTH, 6);
	spritesetvalue(30, S_HEIGHT,17);
	spritesetvalue(30, S_IS_SCROLLED,0);
	putsprite(30, 120, 100);
	getsprite(31, gui);
	spritesetvalue(31, S_WIDTH, 32);
	spritesetvalue(31, S_HEIGHT,16);
	spritesetvalue(31, S_IS_SCROLLED,0);
	putsprite(31, 2, 100);
	loadtile(maze, 16, 16, 21, 21);
	health = 10;
	maxhealth = 10;
	attack = 1;
	block = 0;
	shield = 0;
	sword = 0;
	armor = 0;
	printtosprite(5, 1, health);
	printtosprite(5, 9, attack);
	hpoison = 4;
	level = 1;
}

void endGame() {
	setbgcolor(1);
	setcolor(9);
	clearscreen();

	for (i = 0; i < 32; i++)
		spritesetvalue(i, S_Y, spritegetvalue(i, S_Y) + 1000);

	setimagesize(2);
	putimage1bit(endscreen, 0, 32, 64, 24);	
	setimagesize(1);
	gotoxy(6, 2);
	printf("Game over");
	gotoxy(6, 11);
	printf("floor %d", level);
	gotoxy(6, 13);
	printf("gold %d", gold);
	delay(1000);

	while (getkey() == 0) {
    }

	init();
}

void viewPage() {
	setcolor(1);
	setbgcolor(9);

	for (i = 0; i < 16; i++)
		spritesetvalue(i, S_Y, spritegetvalue(i, S_Y) + 1000);

	fRect(10, 30, 118, 98);
	setcolor(9);
	setbgcolor(1);
}

void hidePage() {
	for (i = 0; i < 16; i++)
		spritesetvalue(i, S_Y, spritegetvalue(i, S_Y) - 1000);

	setcolor(1);
	setbgcolor(0);
}

void Info() {
	viewPage();
	gotoxy(2, 4);
	printf("floor %d", level);
	gotoxy(2, 6);
	printf("gold %d", gold);
	gotoxy(2, 7);
	printf("%c%d/%d", 3, health, maxhealth);
	gotoxy(2, 8);
	printf("%c%d %c%d", 190, attack, 31, block);
	gotoxy(2, 9);
	printf("%s %s+%d", shieldname, "shield", shield);
	gotoxy(2, 10);
	printf("%s %s +%d", swordname, "sword", sword);
	gotoxy(2, 11);
	printf("%s %s +%d", armorname, "armor", armor);
	delay(500);

	while (getkey() == 0) {
    }

	hidePage();
}

void addItem() {
	int r, r1, n, ii;
	r = random(40);
	r1 = random(40);
	n = random(4);

	for (ii = 0; ii < 3; ii++) {
		newname[ii] = names[r1 * 3 + ii];
		newname[ii + 3] = names[r * 3 + ii];
	}

	newname[6] = 39;
	newname[7] = 's';
	newname[8] = 0;

	if (n == 0) {
		for (ii = 0; ii < 9; ii++) {
			shieldname[ii] = newname[ii];
		}

		shield = level / 4 + random(level / 4) + 1;
		printf("You got %s shield" , shieldname);
	} else if (n == 1) {
		for (ii = 0; ii < 9; ii++) {
			swordname[ii] = newname[ii];
		}

		sword = level / 2 + random(level / 2) + 1;
		printf("You got %s sword" , swordname);
	} else if (n == 2) {
		for (ii = 0; ii < 9; ii++) {
			armorname[ii] = newname[ii];	
		}

		armor = level / 4 + random(level / 4) + 1;
		printf("You got %s armor" , armorname);
	} else if (n > 2) {
		n = random(9);

		if (n < 3 && hpoison < 3) {
			hpoison++;
			printf("You got a health potion");
		} else if (n == 3) {
			attack++;
			printf("You got a power potion");
			spritesetvalue(30, S_HEIGHT,1 + hpoison * 4);
		} else if (n == 4) {
			maxhealth++;
			printf("Your maximum health has increased");
		}
	}

	gold += random(level);
	block = shield + armor;
	printtosprite(5, 9, attack + sword);
}

void fight(int i) {
	int n;
	setcolor(1);
	setbgcolor(1);
	fRect(0, 8, 127, 32);
	setcolor(9);
	gotoxy(1,1);

	if (random(1)) {
		if (level > block)
			n = level - block;
		else
			n = 0;

		if (random(3) == 0)
			n = n+1;

		health -= n;
		printtosprite(5, 1, health);
		printf("The enemy took away %d health ", n);
	} else {
		n = attack + sword - level / 2;
		spritesetvalue(i, S_LIVES, spritegetvalue(i, S_LIVES) - n); 
		printf("You took away %d health. ", n);

		if (spritegetvalue(i, S_LIVES) <= 0)
			addItem();
	}

	if (health <= 0)
		endGame();

	delay(400);
	getkey();

	while (getkey() == 0) {
    }
}

int monsterCollisionTest() {
	int nx, ny;
	nx = (offsetx + x * 16 + 2) / 16;
	ny = (offsety + y * 16) / 16;

	for (i = 2; i < 16; i++) {
		if (spritegetvalue(i, S_X) / 16 == nx && spritegetvalue(i, S_Y) / 16 == ny) {
			if (spritegetvalue(i, S_LIVES) > 0) {
				fight(i);
				return 1;
			}
		}
	}

	return 0;
}

void testkey() {
	key = getkey();

	if (key != prevkey) {
		if (key == KEY_LEFT) {
			x--;
			if (maze[x + y * 21] == door)
				isMaze = 0;
			else if (maze[x + y * 21] != floor || monsterCollisionTest())
				x++;
		} else if (key == KEY_RIGHT) {
			x++;

			if (maze[x + y * 21] == door)
				isMaze = 0;
			else if (maze[x + y * 21] != floor || monsterCollisionTest())
				x--;
		}

		if (key == KEY_UP) {
			y--;
			if (maze[x + y * 21] == door)
				isMaze = 0;
			else if (maze[x + y * 21] != floor || monsterCollisionTest())
				y++;
		} else if (key == KEY_DOWN) {
			y++;
			if (maze[x + y * 21] == door)
				isMaze = 0;
			else if (maze[x + y * 21] != floor || monsterCollisionTest())
				y--;
		} else if (key == KEY_A) {
			Info();
		} else if (key == KEY_B) {
			if (health < maxhealth && hpoison > 0) {
				health += maxhealth / 2;

				if (health > maxhealth)
					health = maxhealth;

				hpoison--;
				printtosprite(5, 1, health);
				spritesetvalue(30, S_HEIGHT,1 + hpoison * 4);
			}
		}

		putsprite(1, offsetx + x * 16, offsety + y * 16);
		drawtile(offsetx, offsety + 4);
	}

	prevkey = key;
}

void main() {
	init();

	while (1) {
		generateMaze();
		drawtile(0, 4);

		while (isMaze) {
			nextCadr();
			testkey();
			delayredraw();
		}

		delay(300);
		level++;
	}
}