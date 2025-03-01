// Express JS prermet de mettre un projet rapidement en place
const express=require('express');
const app=express();
// imporation de mysql  et express-connexion
const mysql=require("mysql")
const express_conn=require("express-myconnection")

// Declaration du type de view et le chemin vers nos views
app.set('view engine','ejs');
app.set('views','./pages')

// Les options de connexion a la base de données
const optionsConnexion={
    host:"localhost",
    user:"root",
    password:"",
    database:"nodejs"
}

// Demmande de la connexion a MySQL
app.use(express_conn(mysql,optionsConnexion,'pool'))

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


app.listen(5000,()=>{
    console.log('Serveur demarrer ...........');
    
})

