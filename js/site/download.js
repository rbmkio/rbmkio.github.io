(function () {

    var downloadList = $("#downloadList");
    var downloadButton = $("#downloadButton");

    downloadButton.click(function () {

        $.getJSON("https://api.rbmk.io/releases?product=radish", function (data) {
            if (data && data.data && data.data.releases) {
                var release = data.data.releases[0];
                var assets = release.assets;

                var items = { };

                for (var i in assets) {
                    var asset = assets[i];
                    var downloadUrl = asset.downloadUrl;

                    if (downloadUrl.endsWith("-x64.exe")) {
                        items["Windows (x64)"] = downloadUrl;
                    }

                    if (downloadUrl.endsWith("-x86.exe")) {
                        items["Windows (x86)"] = downloadUrl;
                    }

                    if (downloadUrl.endsWith(".dmg")) {
                        items["MacOS"] = downloadUrl;
                    }
                }

                downloadList.html("");
                for (var name in items) {
                    downloadList.append('<li><a href="' + items[name] + '">' + name + '</a></li>');
                }
            }
        });

        return false;

    });

})();