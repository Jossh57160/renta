

$(document).ready(function () {

    // "let = variable" et "const = constante"
    // le symbole # signifie qu'on appelle l'élément html par son id
    // et .val() est une fonction jQuery qui appelle la valeur de l'input (soit ce qui a été saisi dans le champ)


    // 1. infos relatives à l'achat

    let prix_achat = $('#prix_achat').val();
    let prix_travaux = $('#prix_travaux').val();
    let frais_notaire = $('#frais_notaire').val();
    let prix_meubles = $('#prix_meubles').val();

    // 2. infos relatives à la location

    let loyer_hc = $('#loyer_hc').val();
    let vacances_locatives = $('#vacances_locatives').val();

    // 3. infos relatives au crédit   

    let apport = $('#apport').val();
    let duree_credit = $('#duree_credit').val();
    let taux_interet = $('#taux_interet').val();
    let assurance_empr = $('#assurance_empr').val();

    // Cette valeur est soit calculée, soit rentrée par l'utilisateur
    let mensualite_credit = $('#mensualite_credit').val();

    // 4. infos relatives à la situation de l'investisseur

    let salaire_net_imp = $('#salaire_net_imp').val();
    let evol_carriere = $('#evol_carriere').val();
    let revenus_loc_existants = $('#revenus_loc_existants').val();

    // 5. infos relatives aux charges du bien            

    let taxe_fonc = $('#taxe_fonc').val();
    let charges_locataire = $('#charges_locataire').val();
    let travaux_entretien = $('#travaux_entretien').val();
    let frais_de_gestion = $('#frais_de_gestion').val();
    let assurance_loyer_imp = $('#assurance_loyer_imp').val();
    let frais_compta = $('#frais_compta').val();

    // 6. infos relatives aux charges LMNP et SCI IS    

    let duree_amo_immeuble = $('#duree_amo_immeuble').val();
    let ratio_im_fonc = $('#ratio_im_fonc').val();
    let duree_amo_travaux = $('#duree_amo_travaux').val();
    let duree_amo_meubles = $('#duree_amo_meubles').val();


    // 7. infos relatives TMI - n'apparait pas dans le html - 

    const transi_TMI_14_30 = 27519;
    const transi_TMI_30_41 = 73779;
    const transi_TMI_41_45 = 156244;



    // Fonctions : une fonction est créée pour chaque groupe de calcul (crédit, charges, etc..) 


    function prix_bien() {

        let prix_total = parseInt(prix_achat) + parseInt(prix_travaux) + parseInt(frais_notaire) + parseInt(prix_meubles);

    }

    function credit() {

        //Il faudrait que le montant emprunté puisse être également rempli par l'utilisateur
        //let montant_emprunte = parseInt(prix_achat) + parseInt(prix_travaux) + parseInt(frais_notaire) - parseInt(apport);
        
        // a supprimer
        let montant_emprunte = 73000;
        let duree_credit = 20;
        let taux_interet = 15;  //je n'arrive pas à mettre un chiffre a virgule dc pour l'instant je divise par 1000 plus bas
        let assurance_empr = 20; // idem mais par 10k
        let mensualite_credit = 305;

        // On crée ici un tableau général comprenant i itération (correspondant au nombre d'année),
        // Ce 1er tableau comprend le reste à rembourser du crédit
        let reste_a_rembourser = new Array();
        let interet_annuel = new Array();   
        let assurance_credit = new Array();
        let montant_amortis_credit = new Array();      

        // cette 1ere boucle correspond à la colonne 1 du scan tableau amortissement sur le drive
        for (i = 0; i < duree_credit; i++) {
            
            //la 1er valeur du tableau est le montant tot de l'emprunt, 
            // c'est une valeur rentrée par l'utilisateur, il faut bien que cette ligne soit dans la boucle!
            // interet_annuel[0] = parseInt(taux_interet)*reste_a_rembourser[0]/1000;
            reste_a_rembourser[0] = parseInt(montant_emprunte);  
            
            // cette ligne correspond à la colonne 2 du scan tableau amortissement sur le drive
            interet_annuel[i] = parseInt(taux_interet)*reste_a_rembourser[i-1]/1000;

            // cette ligne correspond à la colonne 3 du scan tableau amortissement sur le drive
            assurance_credit[i] = parseInt(assurance_empr)*reste_a_rembourser[i-1]/10000;

            // cette ligne correspond à la colonne 4 du scan tableau amortissement sur le drive
            montant_amortis_credit[i] = parseInt(mensualite_credit)*12 - interet_annuel[i] - assurance_credit[i]

            // cette ligne correspond à la colonne 1 du scan tableau amortissement sur le drive
            reste_a_rembourser[i] = reste_a_rembourser[i-1] - montant_amortis_credit[i];

                        
        };

        console.log(reste_a_rembourser);
        console.log(interet_annuel);
        console.log(assurance_credit);
        console.log(montant_amortis_credit);
        // tableau comprenant : reste à rembourser, intérêt annuel, assurance annuelle, montant amorti 
        let tableau_amortissement_credit = new Array()
        for (let i = 0; i < duree_credit; i++)
            tableau_amortissement_credit[i] = new Array();





    }

    $('.test').click(function () {
        credit();
    })



    function displayVals() {

        // parseInt() est une fonction javascript vanilla qui permet d'additionner les valeurs, 
        // si on ne l'utilise pas, javascript va simplement les concaténer

        // et je divise le revenu par cette somme
        let rdt_brut = parseInt(loyer_hc) / parseInt(prix_total) * 100;



        // ici je demande à jQuery de remplir l'élément html qui porte l'#id "result" avec ma variable
        $('#result').html('Rendement brut : ' + rdt_brut);

        console.log("coucou");
    }


    // la fonction a été écrite, mais encore faut il l'appeler pour qu'elle s'exécute 
    // ici on décide de ne l'appeler que s'il y a un changement (une saisie) dans l'input "revenus_meubles"
    $("#prix_travaux").change(displayVals);




});