import React from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"
import { selectView, nightMode, updatePlayist } from "../actions"
import { version } from "../../package.json"
import "./stylesheets/Menu.scss"

class Menu extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            show: false,
            newPlayist: "",
            height: window.innerHeight - 142
        }
        this.showDropdown = this.showDropdown.bind(this)
        this.handleNightmode = this.handleNightmode.bind(this)
        this.handleView = this.handleView.bind(this)
        this.registerNewPlayist = this.registerNewPlayist.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleResize = this.handleResize.bind(this)
    }

    componentDidMount () {
        window.onresize = this.handleResize
    }

    handleResize () {
        this.setState({ height: window.innerHeight - 142 })
    }

    handleChange (e) {
        this.setState({ newPlayist: e.currentTarget.value })
    }

    registerNewPlayist (e) {
        const { dispatch, itemToNewPlayist } = this.props
        e.preventDefault()
        this.setState({ newPlayist: "" })
        dispatch(updatePlayist(this.state.newPlayist, itemToNewPlayist))
    }

    handleNightmode () {
        const { dispatch, night } = this.props
        dispatch(nightMode(!night))
    }

    handleView (e) {
        const { dispatch } = this.props
        dispatch(selectView(e.currentTarget.innerText))
    }

    showDropdown () {
        const { show } = this.state
        this.setState({ show: !show })
    }

    render () {
        const { show, newPlayist, height } = this.state
        const { itemToNewPlayist, playists, night } = this.props
        return (
            <div className="Menu" style={{ height: height }}>
                <div className="title">
                    <h1>carbon</h1>
                    <div>{version}</div>
                </div>
                <div className="menu-list" onClick={this.handleView}>
                    <span></span>
                    <span>Now Playing</span>
                </div>
                <div className="menu-list" onClick={this.handleView}>
                    <span><img src=""/></span>
                    <span>Music</span>
                </div>
                <div className={(show && playists.length > 0) ? "menu-list no-hover" : "menu-list"}>
                    <span></span>
                    <span onClick={this.showDropdown}>Playists</span>
                    <div className="menu-dropdown"
                        style={show || itemToNewPlayist ? { display: "block" } : { display: "none" }}>
                        <form onSubmit={this.registerNewPlayist}
                            style={itemToNewPlayist ? { display: "block" } : { display: "none" }}>
                            <input placeholder="New Playist" type="input" autoFocus
                                onChange={this.handleChange} value={newPlayist} />
                        </form>
                        {playists.map((playist, i) =>
                            <div key={i} className="menu-sublist" onClick={this.handleView}>
                                {playist[0]}
                            </div>
                        )}
                    </div>
                </div>
                <div className="menu-list" onClick={this.handleView}>
                    <span></span>
                    <span>Favourite</span>
                </div>
                <div className="menu-list" onClick={this.handleView}>
                    <span></span>
                    <span>Downloads</span>
                </div>
                <div className="menu-list" onClick={this.handleNightmode}>
                    <span>Night mode</span>
                    <div className="mode-toggle-bar">
                        <div className="mode-toggle" style={night ? { float: "right" } : { float: "left" }}></div>
                    </div>
                </div>
            </div>
        )
    }
}

Menu.propTypes = {
    night: PropTypes.bool,
    itemToNewPlayist: PropTypes.string,
    playists: PropTypes.array
}

const mapStateToProps = (state) => ({
    night: state.mode.night,
    itemToNewPlayist: state.media.itemToNewPlayist,
    playists: state.media.playists
})

export default connect(mapStateToProps, null)(Menu)
