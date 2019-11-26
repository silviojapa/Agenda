app.initialize();

//abre o banco agenda, do banco  de dados Database, com 2000 registros
var db = window.openDatabase("Database","1.0","Agenda", 2000);
db.transaction(createDB, errorDB, successDB);
//quando o objeto documento "escuta" que está pronto executa a função onDeviceReady
document.addEventListener("deviceready", onDeviceReady, false);

//cria tabela no Banco quando dispositivo estiver
function onDeviceReady(){
  db.transaction(createDB, errorDB, successDB);
}

function errorDB(err){
  alert("Erro: "+ err);
}

function successDB(){ }

function createDB(tx){
  tx.executeSql('CREATE TABLE IF NOT EXISTS Agenda (id INTEGER PRIMARY KEY, nome VARCHAR(50), tel NUM(15) )');
}

//Prepara para incluir registro na tabela Agenda
function agenda_insert(){
  db.transaction(agenda_insert_db, errorDB, successDB);
}

//inclui registro na tabela Agenda
function agenda_insert_db(tx){
  var nome = $("#agenda_nome").val();
  var tel = $("#agenda_telefone").val();
  tx.executeSql('INSERT INTO Agenda (nome, tel) VALUES ("' + nome + '", "' + tel + '")');
  agenda_view();
}

//prepara para ler os registros da tabela agenda
function agenda_view(){
  db.transaction(agenda_insert_db, errorDB, successDB);
}

//Monta a matriz com os registros da tabela agenda
function agenda_view_db(tx){
  tx.executeSql('SELECT * FROM Agenda',[], agenda_view_data, errorDB);
}

//
function agenda_view_data(tx, results){
  $("#agenda_listagem").empty();
  var len = results.rows.length;

  for (var i=0; i<len; i++){
    $("#agenda_listagem").append("<tr class='agenda_item_lista'>" +
      "<td><h3>"+results.rows.item(i).nome+"</h3></td>"+
      "<td><h3>"+results.rows.item(i).nome+"</h3></td>"+
      "</tr>");
  }
}
