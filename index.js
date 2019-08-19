var errors = {

}
var form_data = []
const getTotal = (classe) => {
    let total = 0;
    form_data.map((item) => {
        if (item.classe === classe) {
            return total += item.value
        }
    });
    return total
}
const getErros = (item) => {

    return getTotal(item.classe) < parseInt(item.minimum) ? `La quantite minimal n'est pas respecte pour la famille de  ${item.classe} qui est de ${item.minimum}` : ``
}
const handleChange = (classe, produit, value, minimum) => {

    form_data = [...form_data.filter(obj => obj.classe !== classe || obj.produit !== produit), {
            classe: classe,
            produit: produit,
            value: isNaN(parseInt(value)) ? 0 : parseInt(value),
            minimum: parseInt(minimum)
        }]
        //$(`#${classe}`).html(getErros({classe:classe, produit:produit, minimum:parseInt(minimum)}))
    console.log(form_data)
}

const handleSubmit = () => {
    //$(`#Sumsung3`).html(getErros({classe:"Sumsung3", produit:'produit', minimum:parseInt(12)}))
    //e.preventDefault();
    const data = JSON.parse(localStorage.getItem('data'));
    data.map((item) => {
        $(`#${item.classe}`).html(getErros(item))
    })
}

$(document).ready(function() {
    /*
    Les donnees recuperees de la BD via ajax doivent etre structurees de de cette facon
    */

    /* $.ajax({
             type:'POST',
             url:'dada.php',
             dataType: "json",
             success:function(data){
                 if(data.status == 'ok'){
                     $('#userName').text(data.result.name);
                     $('#userEmail').text(data.result.email);
                     $('#userPhone').text(data.result.phone);
                     $('#userCreated').text(data.result.created);
                     $('.user-content').slideDown();
                 }else{
                     /*$('.user-content').slideUp();
                     alert("User not found...");
                } 
             }
         });*/
    var datas = [];
    $(function() { // ready
        $.getJSON('dada.php', function(data) {

            // on demande du json
            $.each(data, function(key, val) {

                datas.push({
                    id: val.categories_id,
                    classe: val.categories_name,
                    minimum: val.QteCheck,
                    produits: [{
                        id: val.product_id,
                        produitname: val.quantity,
                        qte: val.quantity
                    }]
                });

                localStorage.setItem('datas', JSON.stringify(datas))

                console.log(datas);

            });

        });
    });


    /*var data = [{
            id: 1,
            classe: "LITTERIE",
            minimum: 2,
            produits: [{
                    id: 1,
                    nom: "S1",
                    prix: "12",
                    value: 0
                },
                {
                    id: 2,
                    nom: "S2",
                    prix: "12",
                    value: 0
                },
                {
                    id: 3,
                    nom: "S3",
                    prix: "12",
                    value: 0
                }
            ]
        },
        {
            id: 2,
            classe: "REFRIGERATEUR",
            minimum: 1,
            produits: [{
                    id: 1,
                    nom: "S1",
                    prix: "12",
                    value: 0
                },
                {
                    id: 2,
                    nom: "S2",
                    prix: "12",
                    value: 0
                },
                {
                    id: 3,
                    nom: "S3",
                    prix: "12",
                    value: 0
                }
            ]
        },
        {
            id: 3,
            classe: "MICRO-ONDES",
            minimum: 3,
            produits: [{
                    id: 1,
                    nom: "S1",
                    prix: "12",
                    value: 0
                },
                {
                    id: 2,
                    nom: "S2",
                    prix: "12",
                    value: 0
                },
                {
                    id: 3,
                    nom: "S3",
                    prix: "12",
                    value: 0
                }
            ]
        }
    ];*/


    var section = "" // Permet de generer une section, une classe
        // cette boucle permet de parcourir toutes les classes


    data.map((item, Key) => {
        var sect_1 = `<div class='row section'> 
                        <b class='col-lg-12'>${item.classe}</b>
                        <div class="col-md-12">
						<table>
    <tbody>
	
                   `;
        //Cette boucle permet de parcourir les produit de la classe courante
        item.produits.map((elt, key) => {
            //Ici nous construisons pour chaque produit un champs et la fonction handleChange nous permet 
            //de detecter la saisie dans les champs
            sect_1 += `
			<tr>
            <td> Nom produit : ${elt.nom} </td>
            <td> prix <input type="text" name="prix[]"  value=${elt.prix} id=prix class="form-control"  ></td>
            <td> <input type=${item.minimum} name=${item.classe} onkeyup="handleChange(this.name,this.id,this.value,this.type)" id=${elt.nom} class="form-control" placeholder="+" aria-describedby="helpId"></td>
            <td> <input type= name= value="" readonly class="form-control" placeholder=""></td>
             </tr>
            
            <small id="helpId" class="text-muted"></small>
          </div>
            `
        })
        sect_1 += `</tbody></table>
        <small id=${item.classe} style="color:red" class="text-muted"></small>
        </div>
        </div>
        `;
        section += sect_1;
    })
    section += `
    <button onclick="handleSubmit()" type="button" value="send" class="btn btn-primary">Submit</button>
    `
    $("#form").html(section);
    console.log(section)
});