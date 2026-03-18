# 🕒 Solução End-to-End: Automação de Ponto e Pipeline de Dados
> **Arquitetura de Dados:** Da interface HTML ao relatório gerencial automático no Google Sheets.

Este repositório apresenta uma solução robusta para gestão de jornada de trabalho e banco de horas. O projeto substitui processos manuais por um **pipeline de dados inteligente**, garantindo integridade, segurança e escalabilidade para operações de RH e Financeiro.

## 📋 Visão Geral (Caso de Negócio)
A gestão manual de folha de ponto é propensa a erros e consome dezenas de horas produtivas mensalmente. Esta solução resolve essa dor através de uma arquitetura baseada em nuvem que valida cada entrada em tempo real e automatiza a saída de dados estruturados para análise de BI.

## 🏗️ Arquitetura do Workflow (End-to-End)
O dado percorre um fluxo auditável e seguro desde a interação do usuário até a persistência final:

![Diagrama de Workflow](./docs/workflowgeral.png)

1.  **Ingestão:** O usuário autenticado aciona a interface HTML (botão de ponto) integrada a um CRM privado.
2.  **Orquestração:** O **Make (Integromat)** recebe a requisição via Webhook e dispara o gatilho para o processamento.
3.  **Processamento (Pipeline):** O **Google Apps Script** (`doGet`) valida os parâmetros, identifica a planilha específica do funcionário e aplica a lógica de negócio.
4.  **Carga & Ação:** Os dados são gravados na planilha individual e, mensalmente, um relatório consolidado (XLSX) é gerado e enviado automaticamente via e-mail.

## 🛠️ Stack Técnica
* **Google Apps Script (Backend):** Engine central para lógica de negócios, tratamento de timestamps e persistência de dados.
* **Make / Integromat (Orquestração):** Motor de integração que conecta o CRM ao ecossistema Google Workspace.
* **HTML/CSS (Frontend):** Interface de usuário (UI) clean e funcional para captura de dados.
* **Google Sheets (Database):** Repositório de dados estruturados, pronto para consumo em dashboards de BI.

## 💡 Modelo de Dados e Customização
O sistema foi projetado para ser escalável e adaptável ao modelo de negócios:

* **Estrutura Individualizada:** Cada funcionário possui uma planilha própria seguindo um padrão rigoroso, garantindo privacidade e organização.
* **Regras de Negócio Flexíveis:** O script permite ajustes rápidos nas regras de cálculo (tolerâncias, horas extras) para se adequar à operação específica de cada colaborador ou setor.
* **Padronização para BI:** Embora as planilhas sejam individuais, a estrutura de dados é idêntica, facilitando a consolidação em ferramentas como Power BI.

## 📸 Demonstração do Sistema
| Interface do Usuário (HTML) | Orquestração no Make |
| :---: | :---: |
| ![Print UI](./docs/print_html.png) | ![Cenário Make](./docs/print_make.png) |

| Base de Dados & Relatórios (Sheets) |
| :---: |
| ![Print Sheets](./docs/exemplo-planilha-automatizada.xlsx |

## 🚀 Destaques de Engenharia de Dados
* **Integridade de Dados:** Validação cruzada que impede a sobreposição de registros (evita batidas duplas no mesmo período).
* **Referenciação Dinâmica:** O sistema utiliza IDs parametrizados para rotear as informações para a planilha correta em uma infraestrutura *multitenant*.
* **Automação de Ponta a Ponta:** Eliminação total de intervenção humana no fechamento mensal, reduzindo o erro operacional a zero.

## ⚙️ Como Utilizar
1. Clone este repositório.
2. No Google Apps Script, utilize o código presente em `/src/code.gs`.
3. Configure o objeto `CONFIG` no script com os IDs das suas planilhas e e-mails de destino.
4. Publique o script como Web App e conecte a URL ao seu cenário no Make.

---
**Desenvolvido por Andre de Castro Vasconcelos** *Administrador & Analista de Dados | Foco em Automação e BI* [LinkedIn](https://linkedin.com/in/andredecastrovasconcelos)
