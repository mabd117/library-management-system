pipeline {
    agent any

    environment {
        DOCKER_CREDENTIALS_ID = 'dockerhub-credentials-id'
        DOCKERHUB_NAMESPACE = 'mabd117'
        BACKEND_IMAGE = "${DOCKERHUB_NAMESPACE}/library-backend"
        FRONTEND_IMAGE = "${DOCKERHUB_NAMESPACE}/library-frontend"
        KUBECONFIG_CREDENTIALS_ID = 'kubeconfig-credentials-id'
        K8S_NAMESPACE = 'default'
    }

    stages {
        stage('Checkout') {
            steps {
                git 'https://github.com/Mabd11/library-management-system.git'
            }
        }
        stage('Build Backend Image') {
            steps {
                script {
                    docker.build("${BACKEND_IMAGE}:latest", "./backend")
                }
            }
        }
        stage('Build Frontend Image') {
            steps {
                script {
                    docker.build("${FRONTEND_IMAGE}:latest", "./frontend")
                }
            }
        }
        stage('Push Backend Image') {
            steps {
                script {
                    docker.withRegistry('https://index.docker.io/v1/', DOCKER_CREDENTIALS_ID) {
                        docker.image("${BACKEND_IMAGE}:latest").push()
                    }
                }
            }
        }
        stage('Push Frontend Image') {
            steps {
                script {
                    docker.withRegistry('https://index.docker.io/v1/', DOCKER_CREDENTIALS_ID) {
                        docker.image("${FRONTEND_IMAGE}:latest").push()
                    }
                }
            }
        }
        stage('Deploy to Kubernetes') {
            steps {
                withKubeConfig([credentialsId: KUBECONFIG_CREDENTIALS_ID, namespace: K8S_NAMESPACE]) {
                    sh 'kubectl set image deployment/backend-deployment backend=${BACKEND_IMAGE}:latest'
                    sh 'kubectl set image deployment/frontend-deployment frontend=${FRONTEND_IMAGE}:latest'
                }
            }
        }
    }
}

