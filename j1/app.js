// Express JS prermet de mettre un projet rapidement en place
const express=require('express');
const app=express();
// imporation de mysql  et express-connexion
const mysql=require("mysql")
const express_conn=require("express-myconnection")

// Declaration du type de view et le chemin vers nos views
app.set('view engine','ejs');
app.set('views','./pages');

// Les options de connexion a la base de données
const optionsConnexion={
    host:"localhost",
    user:"root",
    password:"",
    database:"nodejs"
}

// Demmande de la connexion a MySQL
app.use(express_conn(mysql,optionsConnexion,'pool'))
app.use(express.urlencoded({extended:false}))

// Declaration des routes vers le server 
app.get('/',(req,res)=>{

    req.getConnection((err,conn)=>{
        if (err) {
            console.log("Erreur de connexion a la base de donnee");
            
        }
        else{
            conn.query("SELECT * FROM etudiant",[],(err,result)=>{
                if (err) {
                    console.log("erreur lors de la requete");
                    
                }
                else{
                    res.status(200).render('index',{result});
                }
            })
        }
    })

  

})

app.post("/ajout",(req,res)=>{
    // console.log(req.body)
    const {matricule,nom,prenom,telephone,adresse,statut,matModif}=req.body;
    let query=""
    let parms=[]
    // console.log(matModif)
    req.getConnection((err,conn)=>{
        if (err) {
            console.log("Erreur de la connexion ");
            
        }
        else{
            if (statut==="modif") {
                query="UPDATE etudiant SET matricule=?, nom=?, prenom=?, telephone=?,adresse=?   WHERE matricule=?";
                parms=[matricule,nom,prenom,telephone,adresse,matModif] 
            }
            else{
                query="INSERT INTO etudiant(matricule,nom,prenom,telephone,adresse) VALUES (?,?,?,?,?)";
                parms=[matricule,nom,prenom,telephone,adresse]
            }

            conn.query(query,parms,(err,result)=>{
                if (err) {
                    console.log("Erreur lors de l'insertion");
                    
                }
                else{
                    res.status(200).redirect('/')
                }
            })
        }
    })
})


app.post("/sup",(req,res)=>{
    const {idSup}=req.body
    req.getConnection((err,conn)=>{
        if (err) {
            console.log("Erreur de la connexion ");
            
        }
        else{
            conn.query("DELETE FROM etudiant WHERE matricule=?",[idSup],(err,result)=>{
                if (err) {
                    console.log("Erreur lors de la suppression");
                    
                }
                else{
                    res.status(200).redirect('/')
                }

            })
        }
    })
})

app.listen(5000,()=>{
    console.log('Serveur demarrer ...........');
    
})

