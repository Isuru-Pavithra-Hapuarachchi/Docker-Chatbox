pipeline {
    agent any
        environment {
        DOCKER_HUB_USERNAME = 'isurupavithra'
        DOCKER_HUB_TOKEN = credentials('docker') // Store PAT in Jenkins credentials
    }
     triggers {
        githubPush()  // Auto-trigger pipeline on Git push
    }

    stages {
        stage('Clone Repository') {
            steps {
                git branch: 'main', url: 'https://github.com/Isuru-Pavithra-Hapuarachchi/Docker-Chatbox'
            }
        }
        stage('Docker Login') {
            steps {
                sh 'echo $DOCKER_HUB_TOKEN | docker login -u $DOCKER_HUB_USERNAME --password-stdin'
            }
        }
        stage('Build and Push Images with Docker Compose') {
            steps {
                sh '''
                docker-compose build
                docker-compose push
                '''
            }
        }
        stage('Deploy to Cloud Server') {
            steps {
                sh '''
                cd /home/isu/Docker-Chatbox
                docker-compose pull
                docker-compose up -d
        '''
    }
}
    }
}
