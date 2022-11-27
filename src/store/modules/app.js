

const state = {
    map: {
        mapBox: null,
        feature: null
    },
    currentArea: 'chengdu',
    currentTab: 1,
    isRightCollapse: false
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
    SET_TAB: (state, currentTab) => {
        state.currentTab = currentTab
    },
    SET_RIGHT_COLLAPSE: (state, isCollapse) => {
        state.isRightCollapse = isCollapse
    }
}

const actions = {

}

const getters = {
    GET_AREA_ID() {
        let orgId
        switch (state.currentArea) {
            case 'chengdu':
                orgId = ""
                break;

            case 'chongzhou':
                orgId = 5
                break;

            case 'dayi':
                orgId = 6
                break;

            case 'pengzhou':
                orgId = 7
                break;

            case 'dujiangyan':
                orgId = 8
                break;

        }
        return orgId

    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}
