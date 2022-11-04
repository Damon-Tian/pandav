

const state = {
    map: {
        mapBox: null,
        feature: null
    },
    currentArea: 'chengdu'
}

const mutations = {
    SET_MAPBOX: (state, mapBox) => {
        state.map.mapBox = mapBox
    },
    SET_MAPFEATURE: (state, feature) => {
        state.map.feature = feature
    },
    SET_CURRENTAREA: (state, currentArea) => {
        state.currentArea = currentArea
    },
}

const actions = {

}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
