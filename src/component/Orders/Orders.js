import React, {Component} from 'react';
import {NavLink} from "react-router-dom";
import './Orders.css';
import {connect} from "react-redux";
import {getOrderDataFromBase} from "../../store/actions";

class Orders extends Component {

    componentDidMount() {
        this.props.getOrderDataFromBase();
    };

    showOrder = () => {
        const order = this.props.orders;
        const dish = this.props.dishes;
        order && Object.keys(order).map(id => {
            const orderId = order[id];
            for (let key in orderId) {
                dish && Object.keys(dish).map(id => {
                    if (key === id) {
                        console.log(dish[id].title + ':' + orderId[key]);
                    }
                });
            }
        })
    };

    render() {
        return (
            <div className="main">
                <div>
                    <NavLink className="links" to={'/'}><span>Dishes</span></NavLink>
                    <NavLink className="links" to={'/orders'}><span>Orders</span></NavLink>
                </div>
                {this.showOrder()}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    orders: state.ordersReducer.orders,
    dishes: state.addReducer.dishes

});

const mapDispatchToProps = dispatch => {
    return {
        getOrderDataFromBase: () => dispatch(getOrderDataFromBase())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Orders);