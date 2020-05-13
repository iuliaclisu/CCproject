const express = require("express")

const Sequelize = require('sequelize')

const sequelize = new Sequelize('article', 'clisuiulia', 'clisuiulia' ,{
    dialect: "mysql",
    host: "localhost"
})

sequelize.authenticate().then(() => {
    console.log("Connected to database")
}).catch((err) => {
    console.log(err)
    console.log("Unable to connect to database")
})

const Article = sequelize.define('article', {
    abstact: Sequelize.STRING,
    title: Sequelize.STRING,
    weburl: Sequelize.STRING
})

const app = express()

app.use('/', express.static('frontend'))

app.get('/hello', (request, response) => {
    response.status(200).json({hello:"succeede"})
})

app.get('/createdb', (request, response) => {
    sequelize.sync({force:true}).then(() => {
        response.status(200).send('tables created')
    }).catch((err) => {
        console.log(err)
        response.status(200).send('could not create tables')
    })
})

app.use(express.json())
app.use(express.urlencoded())

//definire endpoint POST /messages
app.post('/article', (request, response) => {
    Article.create(request.body).then((result) => {
        response.status(201).json(result)
    }).catch((err) => {
                console.log(err)
        response.status(500).send("resource not created")
    })
})

app.get('/article', (request, response) => {
    Article.findAll().then((results) => {
        response.status(200).json(results)
    })
})
app.get('/article/:id', (request, response) => {
    Article.findByPk(request.params.id).then((result) => {
        if(result) {
            response.status(200).json(result)
        } else {
            response.status(404).send('resource not found')
        }
    }).catch((err) => {
        console.log(err)
        response.status(500).send('database error')
    })
})

app.put('/article/:id', (request, response) => {
    Article.findByPk(request.params.id).then((art) => {
        if(art) {
            art.update(request.body).then((result) => {
                response.status(201).json(result)
            }).catch((err) => {
                console.log(err)
                response.status(500).send('database error')
            })
        } else {
            response.status(404).send('resource not found')
        }
    }).catch((err) => {
        console.log(err)
        response.status(500).send('database error')
    })
})
app.delete('/aticle/:id', (request, response) => {
    Article.findByPk(request.params.id).then((art) => {
        if(art) {
            art.destroy().then((result) => {
                response.status(204).send()
            }).catch((err) => {
                console.log(err)
                response.status(500).send('database error')
            })
        } else {
            response.status(404).send('resource not found')
        }
    }).catch((err) => {
        console.log(err)
        response.status(500).send('database error')
    })
})

function showArticles() {
    axios.get('/article').then(function(results) {

        let html = ` <table style="width:500px;">
                <tr>
                    <th>ID</th>
                    <th>abstact</th>
                    <th>title</th> 
                    <th>weburl</th>
                </tr>`

        results.data.forEach(function(element) {
            html += `<tr>
                        <td>${element.id}</td>
                        <td>${element.abstact}</td>
                        <td>${element.title}</td>
                        <td>${element.weburl}</td>
                        <td>
                            <button onClick="editMessage(${element.id})">Edit</button>
                            <button onClick="deleteMessage(${element.id})">Delete</button>
                        </td>
                    </tr>`
        })

        html += `</table>`

        $('#table').html(html)
    }).catch(function(error) {
        console.log(error)
    })
}
function saveAticles(event) {
    event.preventDefault()

    let id = $('#id').val()
    let abstract = $('#abstract').val()
    let title = $('#title').val()
    let weburl = $('#weburl').val() 

}
axios.post('/article', {
    abstract: abstract,
    title: title,
    weburl: weburl
}).then(function(result) {
    showArticles()
    $(event.target).trigger("reset")
}).catch(function(err) {
    alert('Resource could not be saved')
})

function editArticle(id) {
    //get the values from the server
    axios.get('/article'+id).then(function(result) {
        //display values in the form
        $('#id').val(result.data.id)
        $('#abstract').val(result.data.abstract)
        $('#title').val(result.data.title)
        $('#weburl').val(result.data.weburl) 
    }).catch(function(err) {
        console.log(err)
        alert('Could not find resource')
    })
}
axios.put('/article/'+id, {
     abstract: abstract,
    title: title,
    weburl: weburl
}).then(function(result) {
    showArticles()
    $(event.target).trigger("reset")
}).catch(function(err) {
    alert('Resource could not be saved')
})
deleteArticle(id) {
    axios.delete('/article/'+id).then(function(result) {
        showArticles()
    }).catch(function(err) {
        alert('Resource could not delete resource')
    }) 
}
app.listen(8080)