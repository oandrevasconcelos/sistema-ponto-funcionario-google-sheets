/**
 * CONFIGURAÇÕES DO SISTEMA
 * Altere os valores abaixo para as suas IDs e e-mails reais.
 */

const CONFIG = {
  PLANILHA_ID: "SEU_ID_DA_PLANILHA_AQUI",
  EMAIL_DESTINATARIO: "seu-email@exemplo.com",
  NOME_PASTA_DRIVE: "Relatórios de ponto",
  ABA_PONTO: "Ponto",
  ABA_INTERACAO: "Interação",
  ABA_FUNCIONARIO: "funcionario"
};

function doGet(e) {
  var idPlanilha = e.parameter.funcionario; 
  var celulaPonto = e.parameter.celula;

  if (!idPlanilha || !celulaPonto) {
    return ContentService.createTextOutput("Erro: Parâmetros ausentes.");
  }

  return horaMake(idPlanilha, celulaPonto);
}

function horaMake(idPlanilha, celulaPonto) {
  const ss = SpreadsheetApp.openById(idPlanilha);
  const pontoSheet = ss.getSheetByName(CONFIG.ABA_PONTO);
  const interacaoSheet = ss.getSheetByName(CONFIG.ABA_INTERACAO);
  const funcionarioSheet = ss.getSheetByName(CONFIG.ABA_FUNCIONARIO);

  // Lógica de validação e preenchimento...
 
  
  var currentRow = interacaoSheet.getRange("H12").getValue();
  if (!currentRow) return ContentService.createTextOutput("Erro de linha atual.");

  // Marcação do ponto
  pontoSheet.getRange(celulaPonto).setValue(true);
  
  // Exemplo de como usar a data de forma limpa
  var funcionarioRow = currentRow + 6; 
  // ... lógica da colunaFuncionario ...
  
  funcionarioSheet.getRange(funcionarioRow, colunaFuncionario)
                  .setValue(new Date())
                  .setNumberFormat("HH:mm:ss");

  return ContentService.createTextOutput("Ponto registrado com sucesso.");
}


//...na virada do mês, faz a limpeza dos registros anteriores...

function limparIntervalos() {
  const planilha = SpreadsheetApp.openById(CONFIG.PLANILHA_ID);
  planilha.getSheetByName(CONFIG.ABA_INTERACAO).getRange('D14:I44').clearContent();
  planilha.getSheetByName(CONFIG.ABA_FUNCIONARIO).getRange('F20:I50').clearContent();
}


//...logica para enviar os dados via email automaticamente

function exportarEEnviarRelatorioMensal() {
  const planilha = SpreadsheetApp.openById(CONFIG.PLANILHA_ID);
  const abaFuncionario = planilha.getSheetByName(CONFIG.ABA_FUNCIONARIO);
  
  const nomeFuncionario = abaFuncionario.getRange('M8').getValue();
  const balancoHoras = abaFuncionario.getRange('J10').getDisplayValue();

  const hoje = new Date();
  const mesAno = Utilities.formatDate(hoje, "GMT-3", "MMMM yyyy");

  const nomeArquivo = `Relatorio_Ponto_${nomeFuncionario}_${mesAno}.xlsx`;
  const url = `https://docs.google.com/spreadsheets/d/${CONFIG.PLANILHA_ID}/export?format=xlsx`;
  
  const resposta = UrlFetchApp.fetch(url, {
    headers: { 'Authorization': 'Bearer ' + ScriptApp.getOAuthToken() }
  });

  const blob = resposta.getBlob().setName(nomeArquivo);
  const pasta = DriveApp.getFoldersByName(CONFIG.NOME_PASTA_DRIVE).next();
  const arquivoSalvo = pasta.createFile(blob);

  MailApp.sendEmail({
    to: CONFIG.EMAIL_DESTINATARIO,
    subject: `Relatório Mensal - ${nomeFuncionario}`,
    body: `Relatório de ${nomeFuncionario}. Balanço: ${balancoHoras}`,
    attachments: [arquivoSalvo.getAs(MimeType.MICROSOFT_EXCEL)]
  });
}