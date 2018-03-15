import React from "react";
import { Card } from 'antd';
const { Meta } = Card;

class RandomPhotoComponent extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const {breed, image, onrandomclick} = this.props;

        const renderCover = () => {
            if(image) {
                return <img alt={breed} src={image}/>
            } else {
                return <h3>loading...</h3>
            }
        };
        const renderImage = () => {
            if(breed) {
                return (<div>
                    <Card
                        hoverable
                        style={{width: 240}}
                        cover={renderCover()}
                    >
                        <Meta
                            title={breed}
                        />
                    </Card>
                    <i className="anticon anticon-reload" onClick={(e) => onrandomclick(breed)}></i>
                </div>);
            } else {
                return (<h2 style={{ textAlign: 'center', margin: '20px auto' }}>Please, select breed..</h2>);
            }
        };

        return renderImage()
    }
}

export default RandomPhotoComponent