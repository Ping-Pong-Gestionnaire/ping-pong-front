
import jsPDF from "jspdf";
import "jspdf-autotable";
import {getLigneByCommande, getOneCommande} from "../model/commande";
import { saveAs } from 'file-saver';

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


export const generatePDFFacture = async (mode, titre,  date, tabCommande) => {
    const doc = new jsPDF();

    // création PDF
    // "Ping-Pong" en haut à gauche
    doc.setFontSize(11);
    doc.text("Ping-Pong", 10, 10);

    //"Livré par" et "Livré le" en haut à droite
    doc.setFontSize(11);
    const pageWidth = doc.internal.pageSize.getWidth();

    // Titre centré au milieu
    doc.setFontSize(17);
    const title = titre;
    const titleWidth = doc.getTextWidth(title);
    doc.text(title, (pageWidth - titleWidth) / 2, 40);

    // "Ligne de commande" juste au-dessus du tableau
    doc.setFontSize(12);
    doc.text("Lignes de commande", 15, 60);

    // Ajouter le tableau de lignes de commande
    const tableColumn = ["Commande", "fournisseur", "statut", "Produit", "Quantité", "Prix Unitaire", "Total"];
    const tableRows = [];
    var totalGeneral = 0;

    for (const commande of tabCommande) {

        const ligneCommande = [
            commande.matricule,
            commande.fournisseur,
            commande.statut,
            "",
            "",
            "",
            "",
        ];
        tableRows.push(ligneCommande);
        console.log("ma commandeeeee : " + commande.matricule)
        console.log("ma commandeeeee : " + commande.nom)
        let lignesDeCommande = [];
        if (mode === "A") {
            lignesDeCommande = await GetInfoLignes( commande.id); // Appel asynchrone
        } else {
            // Autre cas si nécessaire
        }

        if(lignesDeCommande.length > 0){
            lignesDeCommande.forEach((ligne) => {
                const prixUnitaireArrondi = parseFloat(ligne.prixUnitaire).toFixed(2);
                const totalArrondi = (ligne.qte * ligne.prix_unitaire).toFixed(2);
                totalGeneral += parseFloat(totalArrondi);

                const ligneDeCommande = [
                    "",
                    "",
                    "",
                    ligne.libelle,
                    ligne.qte,
                    ligne.prix_unitaire,
                    totalArrondi,
                ];
                tableRows.push(ligneDeCommande);
            });
        }

    }

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

export const generateCSVFacture = async (mode, titre, date, tabCommande) => {
    const tableRows = [];
    let totalGeneral = 0;

    // Ajouter les lignes de commandes
    for (const commande of tabCommande) {
        const ligneCommande = [
            commande.matricule,
            commande.fournisseur,
            commande.statut,
            "", "", "", ""
        ];
        tableRows.push(ligneCommande);

        let lignesDeCommande = [];
        if (mode === "A") {
            lignesDeCommande = await GetInfoLignes(commande.id); // Appel asynchrone
        } else {
            // Autre cas si nécessaire
        }

        if (lignesDeCommande.length > 0) {
            lignesDeCommande.forEach((ligne) => {
                const prixUnitaireArrondi = parseFloat(ligne.prixUnitaire).toFixed(2);
                const totalArrondi = (ligne.qte * ligne.prix_unitaire).toFixed(2);
                totalGeneral += parseFloat(totalArrondi);

                const ligneDeCommande = [
                    "", "", "", ligne.libelle, ligne.qte, ligne.prix_unitaire, totalArrondi
                ];
                tableRows.push(ligneDeCommande);
            });
        }
    }

    // Ajouter le récapitulatif à la fin du tableau
    const recapRow = ["Total", "", "", "", "", "", totalGeneral.toFixed(2)];
    tableRows.push(recapRow);

    // Créer la chaîne CSV
    const csvContent = tableRows.map(e => e.join(",")).join("\n");

    // Ajouter l'encodage BOM pour UTF-8
    const bom = '\uFEFF';
    const csvWithBom = bom + csvContent;

    // Créer un Blob pour le CSV
    const blob = new Blob([csvWithBom], { type: "text/csv;charset=utf-8;" });

    // Sauvegarder le fichier CSV
    saveAs(blob, "commande_achat.csv");
};

const GetInfoLignes = async (id) => {

    try {
        const data = await getLigneByCommande(id);
        if(data == "400"){
            console.log("data/error : ", data.status);
        }
        else{
            console.log("id commande demandé" + id)
            console.log(" je regarde dans mes lignes commande" + data)
            return data
        }
    } catch (error) {
        console.error("Erreur lors de la recherche de poste :", error);
    }

};



