const fs = require("fs");
const initSqlJs = require("sql.js");

const dbFileName = "./database.db";

initSqlJs().then(function (SQL) {
	const db = new SQL.Database(fs.readFileSync(dbFileName));
	var stmt = "select count(*) from movie_view";
	const res = db.exec(stmt);
	console.log(res);
});
