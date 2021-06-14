
[![MIT License][license-shield]][license-url]
# Universidades do Brasil

<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Sumário</summary>
  <ol>
    <li>
      <a href="#sobre-o-projeto">Sobre o projeto</a>
    </li>
    <li>
      <a href="#começando">Começando</a>
      <ul>
       <a href="#instalação">Instalação</a></li>
      </ul>
    </li>
    <li><a href="#scripts-disponíveis">Scripts 
    Disponíveis</a></li>
      <li><a href="#ambiente">Ambiente</a></li>
    <li><a href="#licença">Licença</a></li>
    <li><a href="#contato">Contato</a></li>
  </ol>
</details>

## Sobre o projeto
> Universidades do Brasil

Interface para manipulação dos dados da [API de universidadades do Brasil](https://github.com/joaoplay16/brazil-universities-api)  

 [Demo](https://braziluniversities.herokuapp.com/)

## Começando
Siga as instruções para conseguir executar o projeto localmente.


### Instalação
1. Instale as dependências
```
yarn install
```
2. Renomeie o arquivo **.env.example** para **.env**

## Scripts disponíveis
No diretório do projeto, você pode rodar:

### `yarn dev`
Executa o projeto no servidor de desenvolvimento.
Abra http://localhost:3000 para visualizar no navegador
### `yarn start`
Irá executar o servidor express que irá servir a pasta **/build.** de produção. Na primeira execução rode `yarn build` antes. 
Abra http://localhost:8080 no navegador para visualizar a build de produção.

### `yarn build`
Faz build do aplicativo para produção na pasta **/build.**

##  Ambiente

Quando `REACT_APP_ENVIRONMENT` for igual a **production**
```
REACT_APP_ENVIRONMENT=production
```
A API de consumo de dados definida será
`https://brazil-universities-api.herokuapp.com` 

Quando `REACT_APP_ENVIRONMENT` for igual a **test**
```
REACT_APP_ENVIRONMENT=test
```
A API de consumo de dados definida será
`http://localhost:8088` 

## Licença
Distribuído sob a licença do MIT. Ver `LICENSE` para mais informações.

## Contato
joaoplay16@gmail.com

[license-shield]: https://img.shields.io/github/license/othneildrew/Best-README-Template.svg?style=for-the-badge
[license-url]: https://github.com/joaoplay16/agendamento-web/blob/main/LICENSE.txt
