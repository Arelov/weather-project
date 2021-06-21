import axios from "axios"
import moment from "moment"
import { createStore } from "vuex"
import { apiUrl, key } from "../constants/api"
import router from "../router"

export default createStore({
  state: {
    place: "Kyiv, ua",
    current_weather: null,
    weeklyForecast: [],
    location: null,
  },
  mutations: {
    setLocation(state, value) {
      state.location = value
    },
    setTodayForecast(state, value) {
      state.current_weather = value
    },
    setWeeklyForecast(state, value) {
      state.weeklyForecast = value
    },
    setPlace(state, value) {
      state.location = null
      state.place = value
    },
  },
  actions: {
    receiveLocation(context) {
      navigator.geolocation.getCurrentPosition((position) => {
        context.commit("setLocation", [
          position.coords.latitude,
          position.coords.longitude,
        ])

        context.dispatch("getTodayForecast")
        context.dispatch("get5dayForecast")
      })
    },
    async getTodayForecast(context) {
      let params = {
        appid: key,
        units: "metric",
      }
      if (context.state.location) {
        params.lat = context.state.location[0]
        params.lon = context.state.location[1]
      } else {
        params.q = context.state.place
      }
      const { data } = await axios({
        url: apiUrl + "weather",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        params,
      })
      const sunrise = moment((data.sys.sunrise + data.timezone) * 1000)
      const sunset = moment((data.sys.sunset + data.timezone) * 1000)
      const duration = moment.duration(sunset.diff(sunrise))
      const hours = parseInt(duration.asHours())
      const minutes = parseInt(duration.asMinutes()) % 60
      const _weather_desc = data.weather[0].description

      const weather_desc =
        _weather_desc[0].toUpperCase() + _weather_desc.slice(1)
      const result = {
        sunrise: sunrise.format("HH:mm"),
        sunset: sunset.format("HH:mm"),
        duration: `${hours}:${minutes}`,
        weather: {
          description: weather_desc,
          icon: data.weather[0].icon,
        },
        temp: parseInt(data.main.temp),
      }
      context.commit("setTodayForecast", result)
    },
    async get5dayForecast(context) {
      try {
        let params = {
          appid: key,
          units: "metric",
        }
        if (context.state.location) {
          params.lat = context.state.location[0]
          params.lon = context.state.location[1]
        } else {
          params.q = context.state.place
        }
        const { data } = await axios({
          url: apiUrl + "forecast",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          params,
        })
        context.commit("setPlace", data.city.name)
        let number = moment(data.list[0].dt_txt).date()
        const data_result = data.list.filter((e) => {
          const current_date = moment(e.dt_txt).date()
          if (current_date > number) {
            number = current_date
            return true
          }
          return false
        })
        const result = data_result.map((e) => {
          const _weather_desc = e.weather[0].description
          const weather_desc =
            _weather_desc[0].toUpperCase() + _weather_desc.slice(1)
          return {
            icon: e.weather[0].icon,
            description: weather_desc,
            temp: parseInt(e.main.temp),
            dayWeek: moment(e.dt_txt).format("dddd"),
            day: moment(e.dt_txt).format("MMMM DD"),
          }
        })
        context.commit("setWeeklyForecast", result)
      } catch (error) {
        router.push("/404")
      }
    },
  },
  modules: {},
})
