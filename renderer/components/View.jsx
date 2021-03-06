import React from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"
import Music from "./Music"
import NowPlaying from "./NowPlaying"
import Setting from "./Setting"
import "./stylesheets/View.scss"

const View = ({ view="Now Playing", songs=[], playists=[] }) => {
    switch (view) {
    case "Music":
        return <Music songs={songs}/>
    case "Favourite":
        return <Music />
    case "Now Playing":
        return <NowPlaying />
    case "Setting":
        return <Setting />
    }

    // Check if we opened playist view
    for (var i=0; i < playists.length; i++) {
        if (view.includes(playists[i][0])) {
            // separate playist name from playist items
            var playist = playists[i].concat()
            playist.shift()
            return <Music playist={playist}/>
        }
    }
    return <NowPlaying />
}

View.propTypes = {
    view: PropTypes.string,
    songs: PropTypes.array,
    playists: PropTypes.array
}

const mapStateToProps = (state) => ({
    view: state.view.category,
    songs: state.media.library,
    playists: state.media.playists
})

export default connect(mapStateToProps, null)(View)
