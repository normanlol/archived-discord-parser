const fr = new FileReader();
const converter = new showdown.Converter();

function parse() {
    document.getElementById("loading").style.display = "block";
    document.getElementById("messageContainer").innerHTML = "";
    document.getElementById("loadTxt").innerHTML = "Reading...";
    var f = document.getElementById("file").files[0];
    fr.readAsText(f, "UTF-8");
    fr.onload = function(fc) {
        document.getElementById("loadTxt").innerHTML = "Parsing (1)...";
        var c = JSON.parse(fc.target.result);
        document.getElementById("loadTxt").innerHTML = "Parsing (2)...<br>If it gets stuck here, <a href='https://nrmn.top/contact/'>give me a shout</a>.";
        console.log(c);
        // actual parsing bit is below
        for (var b in c) {
            var main = document.createElement("DIV");
            main.classList.add("msg");
            var img = document.createElement("IMG");
            img.src = "https://cdn.discordapp.com/avatars/" + c[b].author.id + "/" + c[b].author.avatar + ".png?size=128";
            img.classList.add("avatar");
            img.onerror = function () {
                this.src = "default.png"
            }
            main.append(img);
            var header = document.createElement("H2");
            header.classList.add("header");
            var s1 = document.createElement("SPAN");
            s1.classList.add("username");
            s1.innerHTML = c[b].author.username;
            var s1a = document.createElement("A");
            s1a.href = "https://discord.com/users/" + c[b].author.id + "/";
            s1a.append(s1);
            header.append(s1a);
            var s2 = document.createElement("SPAN");
            s2.innerHTML = new Date(c[b].timestamp);
            s2.classList.add("time");
            header.append(s2);
            main.append(header);
            var p = document.createElement("P");
            p.classList.add("content")
            if (c[b].content !== "") {p.innerHTML = converter.makeHtml(mkLnk(escapeHtml(c[b].content)));} else {p.innerHTML = "<i class='noContent'>No visible content was found.</i>"}
            main.append(p);
            document.getElementById("messageContainer").append(main);
        }
    }
    document.getElementById("loading").style.display = "none";
}

function escapeHtml(unsafe) {
    return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

function mkLnk(t) {
    var replacePattern = /(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim;
	return t.replace(replacePattern, '<a href="$1">$1</a>');
}