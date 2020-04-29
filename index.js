const PdfPrinter=require('pdfmake')

const fonts={
  Roboto:{ 
   normal:'fonts/Roboto-Regular.ttf',
   italic:'fonts/Roboto-Italic.ttf',
   bold:'fonts/Roboto-Bold.ttf',
   lightItalic:'fonts/Roboto-LightItalic.ttf',
   medium:'fonts/Roboto-Medium.ttf'
}
}
const express=require('express')
const app=express()

 
const lines=[]
lines.push([
    {
    text:'Nome',
    style:'header'
    },
     {
    text:'Email',
    style:'header'
    },
     {
    text:'Situação',
    style:'header'
    },
    ])


  for (let i=0;i<30;i++) {

    let ativo='Ativo'

      if(i%2==0){
          ativo={text:'Inativo',style:'inativo'}
      }
      lines.push(['jefferson','jefferson@nodejs.com',ativo])
      
  }

const printer= new PdfPrinter(fonts)

const docDefinition={
  content:[
    
    {image:'images/índice.jpeg',
    // fit:[50,50]
    height:100,
    width:100
    },
   {text:'Curso:Nodejs'},
   {

    table:{
        widths:['*','*',100],
        body:lines
    }
   }
],
styles:{
    header:{
        fontSize:16,
        bold:true
    },
    inativo:{
       
        bold:true
    }
},
footer:(page,pages)=>{
    return {
        columns:[
          'Este documento é parte de exercício.',
          {
              alignment:'right',
              text:[
                  {text:page.toString(),italic:true},
                  ' de ',
                  {text:pages.toString(),italic:true}
              ]

              
          }

        ],
        margin:[40,0]
    }
}

}
app.get('/get',(req,res)=>{
 /*const pdf=printer.createPdfKitDocument({
     content:'ola '+req.params.nome
 })*/
 const pdf=printer.createPdfKitDocument(docDefinition)
 res.header('Content-disposition','inline;filename=arquivo1.pdf')
 res.header('Content-type','application/pdf')
 pdf.pipe(res)
 pdf.end()
})
/** 
 criação do documento em disco local
const fs=require('fs')

pdf.pipe(fs.createWriteStream('doc.pdf'))
pdf.end()
*/
app.listen(3000,()=>console.log('servidor on port:3000'))