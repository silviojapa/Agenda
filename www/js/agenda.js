
app.initialize();

var db = window.openDatabase("Database", "1.0", "Agenda", 2000);
db.transaction(createDB, errorDB, successDB);
document.addEventListener("deviceready", onDeviceReady, false);


function onDeviceReady() {
	db.transaction(createDB, errorDB, successDB);
}


// Trata erro de criação do Banco de Dados
function errorDB(err) {
	alert("Erro: " + err);
}

// Executa se criou o Banco de Dados com sucesso
function successDB() { }

//Cria a tabela se a mesma não existir
function createDB(tx) {
	tx.executeSql('CREATE TABLE IF NOT EXISTS Agenda (id INTEGER PRIMARY KEY, nome VARCHAR(50), tel NUM(15) )');
}

// Prepara para incluir registro na tabela Agenda
function agenda_insert() {
	db.transaction(agenda_insert_db, errorDB, successDB);
}


// Inclui registro na tabela Agenda
function agenda_insert_db(tx) {
	var nome = $("#agenda_nome").val();
	var tel = $("#agenda_telefone").val();
	tx.executeSql('INSERT INTO Agenda (nome, tel) VALUES ("' + nome + '", "' + tel + '")');
	agenda_view();
}

//Prepara para deletar registro da tabela agenda
function agenda_delete(agenda_id){
	$("#agenda_id_delete").val(agenda_id);
	db.transaction(agenda_delete_db,errorDB,successDB);
}
//Deleta registro da tabela Agenda e chama a funcao agenda_view()
function agenda_delete_db(tx){
	var agenda_id_delete = $("#agenda_id_delete").val();
	tx.executeSql("DELETE FROM Agenda WHERE id = "+agenda_id_delete);
	agenda_view();
}

function agenda_view(){
	db.transaction(agenda_view_db,errorDB,successDB);
}

function agenda_view_db(tx){
	tx.executeSql('SELECT * FROM Agenda',[],agenda_view_data,errorDB);
}

function agenda_view_data(tx,results){
$("#agenda_listagem").empty();
var len = results.rows.length;

for(var i = 0; i <len;i++){
	$("#agenda_listagem").append("<tr class='agenda_item_lista'>"+
		"<td><h3>" + results.rows.item(i).nome + "</h2></td>"+
		"<td><h3>" + results.rows.item(i).tel + "</h3></td"+
		"<br><td><input type='button' class='btn btn-lg btn-danger' value='APAGAR' onclick='agenda_delete(" + results.rows.item(i).id +")'>"
		+ "<input type='button' class='btn btn-lg btn-warning' id='botaoE' value='EDITAR' onclick='agenda_udpdate_abrir_tela(" + results.rows.item(i).id +")'></td" + "</tr>");
	}
}

function agenda_udpdate_abrir_tela(agenda_id){
	$("#tela_padrao").hide();//esconde tela inicial
	$("#tela_edicao").show();//mostra tela de edição

	var agenda_nome_update = $("#agenda_item_" + agenda_id + ".agenda_info h3").html();
	var agenda_telefone_update = $("#agenda_item_" + agenda_id + ".agenda_info h5").html();

	$("#agenda_id_update").val(agenda_id);
	$("#agenda_nome_update").val(agenda_nome_update);
	$("#agenda_telefone_update").val(agenda_telefone_update);
}

function agenda_udpdate_fechar_tela(){
	$("#tela_edicao").hide();// esconde tela de edição
	$("#tela_padrao").show();//mostra tela inicial
}

function agenda_update(){
	db.transaction(agenda_update_db, errorDB, successDB);
}

function agenda_update_db(tx){
	var agenda_id_novo = $("#agenda_id_update").val();
	var agenda_nome_novo = $("#agenda_nome_update").val();
	var agenda_telefone_novo = $("#agenda_telefone_update").val();

	tx.executeSql('UPDATE Agenda SET nome="' + agenda_nome_novo + '",tel="' + agenda_telefone_novo + '"WHERE id ="' + agenda_id_novo + '"');

	agenda_udpdate_fechar_tela();
	agenda_view();
}
