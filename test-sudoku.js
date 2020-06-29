
function ResoudreSudoku() {
    var sudoku_tab = [];
    //On essaye de trouver le bon nombre 
    function trouver_bon_nombre(num, ligne, colonne) {
        for (var i = 0; i < 9; i++) {
            //On parcoure les cases du carré de 3x3 ou se situe le chiffre en cours
            //On calcule grâce à (Math.floor(ligne / 3) * 3) sur quel carré de 9 on se situe en découpant en trois paquets de lignes, 0 pour les trois premières, 3 et 6 
            //Ensuite on se situe sur la ligne correspondant à la case du carré qui va être explorée en ajoutant le décalage au calcul précédent et on multiplie le tout par 9 pour avoir la bonne position dans le tableau
            //Ce qui donne ((Math.floor(3 / 3) * 3) + Math.floor(3 / 3)) * 9 pour la 4ieme ligne avec un décalage de 4: on obtient 36
            //On calcule grâce à (Math.floor(colonne / 3) * 3) sur quel carré de 9 on se situe en découpant en trois paquets de colonnes, 0 pour les trois premières, 3 et 6
            //On ajoute ensuite le décalage grâce à i%3
            var case_carree = ((Math.floor(ligne / 3) * 3) + Math.floor(i / 3)) * 9 + (Math.floor(colonne / 3) * 3) + (i % 3);
            if (num == sudoku_tab[(ligne * 9) + i] ||
                num == sudoku_tab[colonne + (i * 9)] || //
                num == sudoku_tab[case_carree]) {
                return false;
            }
        }
        return true;
    }

    function remplir_chiffre(index) {
        //On regarde si l'index n'est pas trop grand et si la case n'est pas déja remplie
        if (index >= sudoku_tab.length) {
            return true;
        } else if (sudoku_tab[index] != 0) {
            return remplir_chiffre(index + 1);
        }
        //On teste avec chaque chiffre
        for (var i = 1; i <= 9; i++) {
            if (trouver_bon_nombre(i, Math.floor(index / 9), index % 9)) {
                sudoku_tab[index] = i;
                if (remplir_chiffre(index + 1)) {
                    return true;
                }
            }
        }
        sudoku_tab[index] = 0;
        return false;
    }



    function aff_sudo_complete(sudoku_tab) {
        var affichage = "";
        for(var i in sudoku_tab){
            var carre = sudoku_tab[i];
            
            //On crée un carré
            affichage += carre + " ";
            
            //Si on arrive à la fin du carré, on mets un grand espace
            if(i % 3 === 2){
                affichage += "  ";
            }
            
            //Si on arrive à la fin d'un ligne on fait un retour à la ligne
            if(i % 9 === 8){
                affichage += "\n";
            }
            
            //Si on arrive à la fin d'un bloc de trois on met un retour à la ligne
            if(i % 27 === 26){
                affichage += "\n";
            }
        }
        console.log(affichage);
        console.timeEnd("Résolu en ");
    }

    
    this.resoudre = function (sudoku) {
        sudoku_tab = sudoku.split('').map(function (nombre) { return isNaN(nombre) ? 0 : +nombre });
        if (sudoku.length !== 81) return "Sudoku non valide";
        console.time("Résolu en ");
        return !remplir_chiffre(0) ? console.log("Pas de solution") : aff_sudo_complete(sudoku_tab); 
    }

}

//var sudoku = '001700509573024106800501002700295018009400305652800007465080071000159004908007053';
//var sudoku ='000801000000000043500000000000070800000000100020030000600000075003400000000200600'; //Hard
//var sudoku ='100007090030020008009600500005300900010080002600004000300000010040000007007000300';
//var sudoku  = "000000680000073009309000045490000000803050902000000036960000308700680000028000000" ;//hard
//var sudoku = "000037600000600090008000004090000001600000009300000040700000800010009000002540000"; //hardcore
//var sudoku = "002700001800000000000400530704000360200804005068000904017002000000000003600007400"; //hard
var sudoku = "000020008000470600000000023650107000370000000014000050000502007083040000009001004"
var solver = new ResoudreSudoku();
solver.resoudre(sudoku);

