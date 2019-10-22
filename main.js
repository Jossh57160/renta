

$(document).ready(function() {


    function displayVals() {

        // "let" et "const" sont des mots clés qui ont remplacé "var"
        // "const" est utilisé pour les variables qui ne changent jamais dans toute l'exécution du script (ex : 
        // les prix moyens du marché)
        // "let" est utilisé pour les variables... ben variables
        // le symbole # signifie qu'on appelle l'élément html par son id
        // et .val() est une fonction jQuery qui appelle la valeur de l'input (soit ce qui a été saisi dans le champ)
        let prix_achat = $('#prix_achat').val();
        let prix_travaux = $('#prix_travaux').val();
        let loyer_hc = $('#loyer_hc').val();
        let frais_notaire = $('#frais_notaire').val();
        // ensuite j'additionne pour avoir le prix total 
        // parseInt() est une fonction javascript vanilla qui permet d'additionner les valeurs, 
        // si on ne l'utilise pas, javascript va simplement les concaténer
        let prix_total = parseInt(prix_achat) + parseInt(prix_travaux);
        // et je divise le revenu par cette somme
        let rdt_brut = parseInt(loyer_hc)/parseInt(prix_total)*100;

        

        // ici je demande à jQuery de remplir l'élément html qui porte l'#id "result" avec ma variable
        $('#result').html('Rendement brut : ' + rdt_brut);

        console.log("coucou");
    }

       
    // la fonction a été écrite, mais encore faut il l'appeler pour qu'elle s'exécute 
    // ici on décide de ne l'appeler que s'il y a un changement (une saisie) dans l'input "revenus_meubles"
    $( "#prix_travaux" ).change( displayVals );




});