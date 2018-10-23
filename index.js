process.env.PORT = process.env.PORT || 3000

const express = require('express')
const bodyParser = require('body-parser')
const child_process = require('child_process')
const app = express()
const Package = require('./package.json')

const dockerCommand = process.env.DOCKER || '/usr/bin/docker'
const token = 'path_token'
const username = 'docker_user_name'
const password = 'docker_user_paaword'

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.post('/webhook/:token', (req, res) => {
  if (!req.params.token || req.params.token != token) {
    console.log("Webhook called with invalid or missing token.")
    return res.status(401).send('Access Denied: Token Invalid\n').end()
  }

  // Send response back right away if token was valid
  res.send('OK')

  const payload = req.body
  const image = `${payload.repository.repo_name}:${payload.push_data.tag}`

  if (!services[image]) return console.log(`Received updated for "${image}" but not configured to handle updates for this image.`)

  //your service name
  const service = 'container_name'
  
  // Make sure we are logged in to be able to pull the image
  child_process.exec(`${dockerCommand} login -u "${username}" -p "${password}"`,
    (error, stdout, stderr) => {
      if (error) return console.error(error)

      // Deploy the image and force a restart of the associated service
      console.log(`Deploying ${image} to ${service}…`)
      child_process.exec(`${dockerCommand} kill ${service}`,
        (error, stdout, stderr) => {
        if (error) {
          console.error(`Failed to deploy ${image} to ${service}!`)
        }
        //your docker comand for new image
        child_process.exec(`${dockerCommand} run --rm -p 8000:8000 --name ${service} ${image} &`,
          (error, stdout, stderr) => {
          if (error) {
            console.error(`Failed to deploy ${image} to ${service}!`)
            return console.error(error)
          }
        })
        console.log(`Deployed ${image} to ${service} successfully and restarted the service.`)
    })
  })
})

app.all('*', (req, res) => {
  res.send('')
})

app.listen(process.env.PORT, err => {
  if (err) throw err
  console.log(`Listening for webhooks on http://localhost:3000/webhook/${token}`)
})
