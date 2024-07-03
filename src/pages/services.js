
import jsPDF from "jspdf";
import "jspdf-autotable";

export const generatePDF = (mode, titre,  livrerPar, livrerLe, lignesDeCommande) => {
    const doc = new jsPDF();

    // "Ping-Pong" en haut à gauche
    doc.setFontSize(11);
    doc.text("Ping-Pong", 10, 10);

    // "Livré par" et "Livré le" en haut à droite
    doc.setFontSize(11);
    const pageWidth = doc.internal.pageSize.getWidth();
    doc.text(`Livré par : ${livrerPar}`, pageWidth - 70, 10);
    doc.text(`Livré le : ${livrerLe}`, pageWidth - 70, 20);

    // Titre centré au milieu
    doc.setFontSize(17);
    const title = titre;
    const titleWidth = doc.getTextWidth(title);
    doc.text(title, (pageWidth - titleWidth) / 2, 40);

    // "Ligne de commande" juste au-dessus du tableau
    doc.setFontSize(12);
    doc.text("Lignes de commande", 15, 60);

    // Ajouter le tableau de lignes de commande
    const tableColumn = ["Produit", "Quantité", "Prix Unitaire", "Total"];
    const tableRows = [];
    var totalGeneral = 0;

    lignesDeCommande.forEach((ligne) => {
        const prixUnitaireArrondi = parseFloat(ligne.prixUnitaire).toFixed(2);
        const totalArrondi = (ligne.quantite * ligne.prixUnitaire).toFixed(2);
        totalGeneral += parseFloat(totalArrondi);

        const ligneDeCommande = [
            ligne.produit,
            ligne.quantite,
            prixUnitaireArrondi,
            totalArrondi,
        ];
        tableRows.push(ligneDeCommande);
    });

    // creation table ligne
    doc.autoTable({
        head: [tableColumn],
        body: tableRows,
        startY: 65,
        headStyles: {
            fillColor: [ 50, 161, 206 ] // Couleur bleu personnalisée pour l'en-tête
        },
        footStyles: {
            fillColor: [ 50, 161, 206 ] // Couleur bleu personnalisée pour le pied de page
        }
    });

    // table recap
    // Ajouter le récapitulatif
    // Ajouter le récapitulatif à droite du tableau principal
    const finalY = doc.autoTable.previous.finalY;
    const recapColumn = ["Total","TTC" ];
    const recapRows = [
        ["", totalGeneral.toFixed(2) + " €" ]
    ];

    doc.autoTable({
        head: [recapColumn],
        body: recapRows,
        startY: finalY + 10, // Aligner le début du récapitulatif avec la fin du tableau principal
        margin: {left: pageWidth - 100}, // Placer le récapitulatif à droite
        tableWidth: 80,
        headStyles: {
            fillColor: [50, 161, 206] // Couleur bleu personnalisée pour l'en-tête
        },
        bodyStyles: {
            fontStyle: 'bold' // Mettre en gras
        }
    });




    // Enregistrer le PDF
    doc.save("commande_achat.pdf");
};



