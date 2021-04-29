# Dive Schedule Client

![Lines of code](https://img.shields.io/tokei/lines/github/subaquatic-pierre/client-diveschedule)
![GitHub top language](https://img.shields.io/github/languages/top/subaquatic-pierre/client-diveschedule)

## Introduction

The client side code for Sandy Beach Dive Centre Schedule application. The application is hosted on AWS at the following url: www.scubadivedubai.com. It uses AWS CodePipeline for CI/CD workflow. Developers build the project in the development repo, once changes are tested in the staging environment the development branches are merged with the main branch and pushed to the public GitHub repository.

### Technologies

- Build using TypeScript with ReactJS
- Apollo Client is used to communicate with a Django GraphQL backend
