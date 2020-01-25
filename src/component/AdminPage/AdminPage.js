import React, {Component} from 'react';
import {connect} from "react-redux";
import {
    buttonOnChangeToFalse, buttonOnChangeToTrue,
    deleteDish,
    editDish,
    getDataFromBase,
    sentDataToBase
} from "../../store/actions";
import './AdminPage.css';
import {NavLink} from "react-router-dom";

let editId;

class AdminPage extends Component {

    state = {
        title: '',
        price: '',
        image: ''
    };

    componentDidMount() {
        this.props.getDataFromBase();
    };

    inputChanged = event => this.setState({[event.target.name]: event.target.value});

    submitData = e => {
        e.preventDefault();
        this.props.onDishAdded(this.state);
        this.setState({title: '', price: '', image: ''});
    };

    getEditItem = id => {
        this.props.buttonOnChangeToFalse();
        editId = id;
        this.setState({title: this.props.dishes[id].title, price: this.props.dishes[id].price, image: this.props.dishes[id].image});
    };

    editData = e => {
        e.preventDefault();
        this.props.buttonOnChangeToTrue();
        this.props.editDish(editId, this.state);
        this.setState({title: '', price: '', image: ''});
    };

    render() {
        return (
            <div className="main">
                <div>
                    <NavLink className="links" to={'/'}><span>Dishes</span></NavLink>
                    <NavLink className="links" to={'/orders'}><span>Orders</span></NavLink>
                </div>
                <p><b>Add/Edit</b></p>
                <form className="input">
                    <input value={this.state.title} onChange={this.inputChanged} type="text" name="title" placeholder="Add title"/>
                    <input value={this.state.price} onChange={this.inputChanged} type="number" name="price" placeholder="Add price"/>
                    <input value={this.state.image} onChange={this.inputChanged} type="text" name="image" placeholder="Add image URL"/>
                    {this.props.addEdit === true ? <button onClick={this.submitData}>ADD</button> :
                        <button onClick={(e) => this.editData(e)}>EDIT</button>
                    }
                </form>
                {this.props.error !== null ? <p><b>ERROR</b></p> : this.props.dishes && Object.keys(this.props.dishes).map(id => (
                    <div key={id} className="addedDishes">
                        <img src={this.props.dishes[id].image} alt=""/>
                        <div className="spans">
                            <span><b>{this.props.dishes[id].title}</b></span>
                            <span><b>{this.props.dishes[id].price} KGS</b></span>
                        </div>
                        <div className="buttons">
                            <b onClick={() => this.getEditItem(id)}>Edit</b>
                            <b onClick={() => this.props.deleteDish(id)}>Delete</b>
                        </div>
                    </div>
                ))}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    dishes: state.addReducer.dishes,
    error: state.addReducer.error,
    addEdit: state.addReducer.addEdit
});

const mapDispatchToProps = dispatch => {
    return {
        onDishAdded: data => dispatch(sentDataToBase(data)),
        getDataFromBase: () => dispatch(getDataFromBase()),
        deleteDish: id => dispatch(deleteDish(id)),
        editDish: (id, data) => dispatch(editDish(id, data)),
        buttonOnChangeToFalse: () => dispatch(buttonOnChangeToFalse()),
        buttonOnChangeToTrue: () => dispatch(buttonOnChangeToTrue())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminPage);