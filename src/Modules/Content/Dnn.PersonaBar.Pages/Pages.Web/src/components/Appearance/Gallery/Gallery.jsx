import React, {Component, PropTypes} from "react";
import { Scrollbars } from "react-custom-scrollbars";
import style from "./style.less";

class Gallery extends Component {

    getElementSize() {
        const { size } = this.props;
        return size === "big" ? 198 : 130;        
    }

    calculateGalleryWidth() {
        const { children } = this.props;
        return this.getElementSize() * children.length;
    }

    scrollToSelectedItem(scrollToIndex) {
        const indexToScroll = scrollToIndex !== -1 ? scrollToIndex : 0; 
        const scrollbars = this.refs.scrollbars;
        const scrollClientWidth = scrollbars.getClientWidth();
        const scrollLeft = indexToScroll * this.getElementSize();
        const currentScrollLeft = scrollbars.getScrollLeft();
        const lowBoundary = currentScrollLeft;
        const highBoundary = currentScrollLeft + scrollClientWidth;        
        if (scrollLeft > lowBoundary && scrollLeft < highBoundary) {
            return;
        }
        this.refs.scrollbars.scrollLeft(scrollLeft);
    }

    componentWillReceiveProps(newProps) {
        setTimeout(() => this.scrollToSelectedItem(newProps.scrollToIndex), 0);
    }
    
    componentDidMount() {
        setTimeout(() => this.scrollToSelectedItem(this.props.scrollToIndex), 0);
    }

    render() {  
        const width = this.calculateGalleryWidth();    
        return (
            <div className={style.moduleContainer}>
                <Scrollbars ref="scrollbars"
                    className="container"
                    autoHeight
                    autoHeightMin={0}
                    autoHeightMax={480}>
                    <div style={{width}}>
                        {this.props.children}
                    </div>
                </Scrollbars>
            </div>
        );
    }
}

Gallery.propTypes = {
    children: PropTypes.node,
    scrollToIndex: PropTypes.number,
    size: PropTypes.oneOf(["small", "big"])
};

Gallery.defaultProps = {
    size: "big",
    scrollToIndex: 0
};

export default Gallery;