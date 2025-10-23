# 🧊 Fridge API: Sistema de Inventário Completo (Full-Stack)

## 📌 Visão Geral

Este projeto é uma **aplicação Full-Stack** que simula um sistema de inventário de alimentos (uma geladeira). É composto por um backend **API RESTful** em Java e um frontend moderno desenvolvido em React.

A aplicação oferece as operações básicas de persistência de dados (**CRUD**: Create, Read, Update, Delete) e segue os princípios de código desacoplado e fácil manutenção.

---

## 🛠️ Tecnologias e Arquitetura

O projeto é dividido em dois módulos principais:

### ⚙️ Backend (Java/Spring Boot)

* **Linguagem:** Java 21
* **Framework:** Spring Boot (versão `3.5.6`)
* **Arquitetura:** Padrão Controller-Service-Repository.
* **Módulos Core:** Spring Web e Spring Data JPA/Hibernate.
* **Banco de Dados (Local):** H2 Database (em memória para desenvolvimento rápido).
* **Gerenciador de Build:** Apache Maven (`pom.xml`).
* **Wrapper:** `mvnw.cmd` (para execução via Maven Wrapper).

### 💻 Frontend (React/Vite)

* **Framework Principal:** React (`^19.1.1`)
* **Tooling:** **Vite** (`^7.1.7`), TypeScript, e React Router (`^7.9.2`).
* **Estilização:** TailwindCSS.
* **Comunicação API:** Axios (`^1.12.2`) para requisições assíncronas.

---

## ☁️ Configuração de Deploy (AWS e Vercel)

Esta seção detalha as configurações de ambiente utilizadas para deploy em produção:

### 🚀 Backend na AWS (EC2)

Para resolver problemas de `Mixed Content` e garantir a segurança na comunicação, o backend foi configurado para rodar em um protocolo seguro.

* **Infraestrutura:** AWS EC2.
* **Protocolo de Produção:** **HTTPS** ativado.
* **Porta de Produção:** **8443** (configurada via `application.yml`).
* **Segurança (SSL):** Uso de certificado SSL/TLS (KeyStore PKCS12) configurado diretamente no servidor Spring Boot.
* **Regras de Firewall:** A porta **8443** foi explicitamente aberta no Security Group da AWS.

### 🌐 Frontend no Vercel

O frontend é hospedado no Vercel e consome a API através de variáveis de ambiente.

* **Variável de Ambiente:** `VITE_API_BASE_URL` configurada no Vercel para o endpoint HTTPS do backend (ex: `https://[IP_DA_EC2]:8443`).
