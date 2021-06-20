let data = "units=metric";
let apiKey = "&apikey=48016d9c63a4614c06b5bee340172a5f";
let url = "https://api.openweathermap.org/data/2.5/";
let imgUrl = "http://openweathermap.org/img/wn/";

$(".weather-showing-type").first().focus();
$(".search-btn").on('click', () => {
    if($(".search").val() != "") {
        data = "units=metric&q=" + $(".search").val();
    } else {
        data = "units=metric&q=" + $(".search").attr('placeholder');
    }
    start();
})

navigator.geolocation.getCurrentPosition((position) => {
    data += "&lat=" + position.coords.latitude + "&lon=" + position.coords.latitude;
    start();
}, () => {
    data += "&q=Kiev, ua";
    start();
});


class Weather {
    static getTodayForecast() {
        $.ajax({
            url: url + "weather/?" + apiKey,
            data: data,
            success: (response) => {
                $(".search").attr('placeholder', response.name + ", " + response.sys.country);
                data = "units=metric&lat=" + response.coord.lat + "&lon=" + response.coord.lon;

                Weather.fillCurrWeather(response);
                Weather.getNearbyPlacesForecast();
                showMain();
            },
            error: () =>  {
                error404();
            }
        });
    }

    static get5dayAnd3hourForecast() {
        $.ajax({
            url: url + "forecast/?" + apiKey,
            data: data,
            success: function (response) {
                Weather.fillFiveDayForecast(response);
                Weather.fillHourlyForecast(response.list, "#today-hourly");
                Weather.fillHourlyForecast(response.list, "#five-day-hourly");
                showMain();
            },
            error: function() {
                error404();
            }
        });
    }

    static getNearbyPlacesForecast() {
        $.ajax({
            url: url + "find/?" + apiKey,
            data: data + "&cnt=4",
            success: function (response) {
                $("#nearby > div").empty();
                for (let i = 0; i < response.list.length; i++) {
                    $("<div>", {
                        class: "neraby-places-item",
                        text :response.list[i].name,
                        append: $("<div>")
                        .add("<img src=" + imgUrl + response.list[i].weather[0].icon + "@2x.png>")
                        .add("<div>" + Math.round(response.list[i].main.temp) + "°С</div>")
                    }).appendTo("#nearby > div");
                }
                showMain();
            },
            error: function() {
                error404();
            }
        });
    }


    static fillFiveDayForecast(response) {
        $("#daysContainer").empty();
        for (let i = 0; i < 5; i++) {
            let todayDate = new Date(response.list[i * 8].dt * 1000).toDateString().split(" ");
            $("<button>", {
                append: $("<h6>", {
                    text: todayDate[0]
                })
                .add("<div>" + todayDate[1] + " " + todayDate[2] + "</div>")
                .add("<img src=" + imgUrl + response.list[i * 8].weather[0].icon + "@2x.png>")
                .add("<div>" + Math.round(response.list[i * 8].main.temp) + "°С</div>")
                .add("<div>" + response.list[i * 8].weather[0].description + "</div>"),
                class: 'daysContainer-item',
                click: function() {
                    for (const key in response.list) {
                        if(new Date(response.list[key].dt * 1000).toDateString() == new Date(response.list[i * 8].dt * 1000).toDateString()) {
                            Weather.fillHourlyForecast(response.list.slice(key), "#five-day-hourly");
                            return;
                        }
                    }
                }
            }).appendTo("#daysContainer");
        }
    }
    static fillCurrWeather(response) {
        $("#todayForecast .current-weather h6").last().text(new Date(response.dt * 1000).toLocaleDateString());
        $("#todayForecast .weather img")
            .attr('src', imgUrl + response.weather[0].icon + '@2x.png')
        $("#todayForecast .weather div").text(response.weather[0].description);
        $("#todayForecast .temperature").text(Math.round(response.main.temp) + "°С");
        $("#dayInfo .dayInfo-values").children().eq(0).text(GetTimeFromUnixTime(response.sys.sunrise));
        $("#dayInfo .dayInfo-values").children().eq(1).text(GetTimeFromUnixTime(response.sys.sunset));

        let timeDiff = Math.floor((new Date(response.sys.sunset) - new Date(response.sys.sunrise)) / 60);
        $("#dayInfo .dayInfo-values").children()
            .eq(2).text(`${Math.floor(timeDiff / 60)}:${timeDiff % 60 < 10?'0'+timeDiff % 60:timeDiff % 60} hr`);
    }
    static fillHourlyForecast(list, tag) {
        for (let i = 0; i < 6; i++) {
            if(i == 0) {
                $(tag + " h6").text(new Date(list[i].dt * 1000).toDateString().split(" ")[0]);
            }
            $(tag + " tr").eq(0).children().eq(i+1)
                .text(GetTimeFromUnixTime(new Date(list[i].dt)));
            $(tag + " tr").eq(1).children().eq(i+1)
                .html("<img src=" + imgUrl + list[i].weather[0].icon + "@2x.png>");
            $(tag + " tr").eq(2).children().eq(i+1)
                .text(list[i].weather[0].description);
            $(tag + " tr").eq(3).children().eq(i+1)
                .text(Math.round(list[i].main.temp_max)+"°");
            $(tag + " tr").eq(4).children().eq(i+1)
                .text(Math.round(list[i].main.temp) + "°");
            $(tag + " tr").eq(5).children().eq(i+1)
                .text(Math.round(list[i].wind.speed) + " " + Weather.degToSide(list[i].wind.deg));
        }
    }

    static degToSide(deg) {
        if((deg >= 337.5 && deg <= 360) || (deg >= 0 && deg < 22.5)) {
            return "N";
        } else if(deg >= 22.5 && deg < 67.5) {
            return "NE";
        } else if(deg >= 67.5 && deg < 112.5) {
            return "E";
        } else if(deg >= 112.5 && deg < 157.5) {
            return "SE";
        } else if(deg >= 157.5 && deg < 202.5) {
            return "S";
        } else if(deg >= 202.5 && deg < 247.5) {
            return "SW";
        } else if(deg >= 247.5 && deg < 292.5) {
            return "W";
        } else if(deg >= 292.5 && deg < 337.5) {
            return "WN";
        }
    }
}

$(".weather-showing-type").first().on('click', () => {
    $("#fiveDayForecast").css('display', 'none');
    $("#todayForecast").css('display', 'block');
});

$(".weather-showing-type").last().on('click', () => {
    $("#todayForecast").css('display', 'none');
    $("#fiveDayForecast").css('display', 'block');
})

function GetTimeFromUnixTime(timestamp) {
    let date = new Date(timestamp * 1000);
    let minutes = date.getMinutes() < 10 ?'0' + date.getMinutes() :date.getMinutes();
    return `${date.getHours() % 12 || 12}:${minutes} ${date.getHours() < 12 ?"AM":"PM"}`;
}

function showMain() {
    $("main").css('display', 'block');
    $("#error404").css('display', 'none');
}

function start() {
    Weather.getTodayForecast();
    Weather.get5dayAnd3hourForecast();
}

function error404() {
    $("main").css('display', 'none');
    $("#error404").css('display', 'block');
}