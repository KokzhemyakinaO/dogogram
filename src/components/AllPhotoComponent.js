import React from "react";
import { Col} from 'antd';

class AllPhotoComponent extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const {allimage} = this.props;

        var imagesView = allimage.map(function(a, i) {
            return (
                <Col span={6} key={i} >
                    <img className="allImg" src={a} alt={a}/>
                </Col>
            );
        }, this);

        return (imagesView)
    }
}

export default AllPhotoComponent