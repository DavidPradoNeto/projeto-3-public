function getSession(){
        if(localStorage.getItem('token')){
            document.querySelector('.pagina-inicial').style = "width: 0; height: 0; visibility: hidden;";
            document.querySelector('.pagina-logado').style = "width: 100%; height: 100%; visibility: visible;";
        }
            
}

function logout(){
    localStorage.clear();
    location.reload();
}

function mostraLoader(opt) {
    var loader = document.querySelector('.loader');
    if(opt)
        loader.style.visibility = "visible";
    else
        loader.style.visibility = "hidden";

}

function validaLogin(email, senha) {
    var erro = document.querySelector('#invalido');

    if (email.value == '' && senha.value == ''){
        erro.innerHTML = "Digite um Email e Senha"
        erro.style.visibility = "visible"; 
    }else if (email.value.length < 3){
        erro.innerHTML = "Email Inválido"
        erro.style.visibility = "visible"; 
    }else if (senha.value.length < 3){
        erro.innerHTML = "Senha Inválida"
        erro.style.visibility = "visible"; 
    }else{
        erro.innerHTML = ""
        erro.style.visibility = "hidden"; 
    }

    if (erro.style.visibility == "hidden")
        return true;
    else
        return false;
}

function entrarGoogle(){
    document.querySelector('.pagina-inicial').style = "width: 0; height: 0; visibility: hidden;";
    document.querySelector('.pagina-logado').style = "width: 100%; height: 100%; visibility: visible;";
}


function cadastrar(nome, email, password){

    const data = { 
        nome: nome.value,
       email: email.value,
       password: password.value
    };

        fetch('/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        })
        .then((response) => {
            alert("Cadastrado com Sucesso!");
            location.reload();
        })
        .catch((error) => {
            console.log(error);
        });
}


function login(user, password){

    const data = { 
       email: user.value,
       password: password.value
    };

        fetch('/signin', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        })
        .then((response) => response.json())
        .then((data) => {
            if(data.token){
            document.querySelector('.pagina-inicial').style = "width: 0; height: 0; visibility: hidden;";
            localStorage.setItem('token', data.token);  // armazena esse usuario no localStorage para manter o login
            document.querySelector('.pagina-logado').style = "width: 100%; height: 100%; visibility: visible;";
            }else{
                console.log(data);
                var erro = document.querySelector('#invalido');
                erro.innerHTML = "Usuário ou Senha Invalidos";
                erro.style.visibility = "visible"; 
            }
        }).catch((error) => {
            console.log(error);
        });
}

function buscar(pesquisa){
    
    var options = {
        method: 'GET',
        url: 'https://api.newscatcherapi.com/v2/search',
        params: {q: pesquisa, lang: 'pt', sort_by: 'relevancy', page: '1', page_size: '5'},
        headers: {
            'x-api-key': 'tltdkFRn7gOmFB-javf-ll2EYqROCR5HZ8r-GdthlR4'
        }
    };

    axios.request(options).then(function (response) {
        request = response.request;
        if (request.readyState === 4 && request.status === 200){
            var resultado = JSON.parse(request.responseText);
                if (resultado.status == "ok"){
                    resultado.articles.forEach(artigo => {
                        
                        var newDiv = document.createElement("div"),
                            titleNode = document.createElement("h2"),
                            mediaNode = document.createElement("img"), 
                            summaryNode = document.createElement("p"),
                            linkNode = document.createElement("a"),
                            metaDados = document.createElement("p"),
                            separador = document.createElement("hr");
                        
                            titleNode.value = artigo.title;
                            
                            mediaNode.src = artigo.media
                            mediaNode.style = "max-width: 400px; max-height: 400px; display: block;";

                            summaryNode.innerHTML = artigo.summary;
                            summaryNode.style = "text-align: justify;";

                            linkNode.href = artigo.link;
                            linkNode.target = "_blank";
                            linkNode.innerHTML = "<h2>"+titleNode.value+"</h2>";
                            linkNode.style = "color: black; text-decoration: none;"

                            metaDados.innerHTML = "Fonte: "+artigo.rights+"<br>Autor: "+ (artigo.author !== null ? artigo.author : "Desconhecido") +"<br>Data de Publicação: "+artigo.published_date;
                            metaDados.style = "font-size: 10px";

                            newDiv.appendChild(linkNode);
                            newDiv.appendChild(mediaNode);
                            newDiv.appendChild(summaryNode);
                            newDiv.appendChild(metaDados);
                            newDiv.appendChild(separador);
                            
                            document.querySelector('#resultado').appendChild(newDiv);

                    });
                    mostraLoader(false);
                                                                     
                }else{
                    document.querySelector('#resultado').innerHTML = resultado.status;
                    mostraLoader(false);
                }
        }
    
    }).catch(function (error) {
            console.log(error);
            document.querySelector('#resultado').innerHTML = "Monthly API free calls limit reached";
            mostraLoader(false);
    });
}


// Get the modal
var modal = document.getElementById('id01');

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}