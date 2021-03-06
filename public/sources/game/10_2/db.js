/**
 * Created by PHI LONG on 8/29/2016.
 */
var iqTestSource = [
    {1: 6},
    {2: 8},
    {3: 312},
    {4: 128},
    {5: 9},
    {6: 225},
    {7: 95},
    {8: 4},
    {9: 4},
    {10: 1},
    {11: 4},
    {12: 5},
    {13: 4},
    {14: 3},
    {15: 3},
    {16: 2},
    {17: 3},
    {18: 3},
    {19: 4},
    {20: 3},
    {21: 4},
    {22: 32},
    {23: 12},
    {24: 3},
    {25: 9},
    {26: 19},
    {27: 720},
    {28: 1},
    {29: 2},
    {30: 10},
    {31: 1},
    {32: 6},
    {33: 37},
    {34: 120},
    {35: 2325},
    {36: 566},
    {37: 4},
    {38: 6},
    {39: 126},
    {40: 16},
    {41: 23},
    {42: 6258},
    {43: 49},
    {44: 25},
    {45: 320},
    {46: 85914},
    {47: 3},
    {48: 11},
    {49: 49},
    {50: 12},
    {51: 7},
    {52: 12},
    {53: 47},
    {54: 5},
    {55: 9},
    {56: 27},
    {57: 6},
    {58: 5},
    {59: 2},
    {60: 40},
    {61: 55},
    {62: 16},
    {63: 4},
    {64: 4},
    {65: 2},
    {66: 2},
    {67: 3},
    {68: 5},
    {69: 2},
    {70: 4},
    {71: 12},
    {72: 26},
    {73: 4},
    {74: 83},
    {75: 8},
    {76: 10},
    {77: 6},
    {78: 1},
    {79: 126},
    {80: 720},
    {81: 3},
    {82: 3},
    {83: 2},
    {84: 2},
    {85: 4},
    {86: 3},
    {87: 913},
    {88: 4},
    {89: 100},
    {90: 16},
    {91: 41},
    {92: 14},
    {93: 7},
    {94: 99},
    {95: 6859},
    {96: 4},
    {97: 5},
    {98: 630},
    {99: 2},
    {100: 15},
    {101: 4},
    {102: 18},
    {103: 3},
    {104: 10},
    {105: 42},
    {106: 4254},
    {107: 453},
    {108: 37},
    {109: 8},
    {110: 5},
    {111: 28917},
    {112: 17},
    {113: 29},
    {114: 3},
    {115: 20},
    {116: 2},
    {117: 122},
    {118: 24},
    {119: 10},
    {120: 120},
    {121: 87},
    {122: 13},
    {123: 2150},
    {124: 12},
    {125: 59},
    {126: 2},
    {127: 8},
    {128: 2},
    {129: 5},
    {130: 3},
    {131: 1},
    {132: 2},
    {133: 4},
    {134: 2},
    {135: 1},
    {136: 2},
    {137: 5},
    {138: 3},
    {139: 5},
    {140: 3}
];


function shuffle(array) {
    var copy = [],
        n = array.length,
        i;

    // While there remain elements to shuffle…
    while (n) {

        // Pick a remaining element…
        i = Math
            .floor(Math.random() * array.length);

        // If not already shuffled, move it to the new array.
        if (i in array) {
            copy
                .push(array[i]);
            delete array[i];
            n--;
        }
    }

    return copy;
}

