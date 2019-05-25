import React from 'react';
import ProductItem from './ProductItem/ProductItem';



class ProductWrapper extends React.Component {
    state = {
        fridge: [],
    };

    render() {
        return (<>
            <h1 className="productWrapper__header">Lodówka</h1>
            <form>
                <div className="productWrapper__wrapper">
                    <input type="text" id="name" placeholder="Nazwa produktu" className="productWrapper__name"/>
                    <input id="quantity" placeholder="ilość" className="productWrapper__quantity"/>
                    <button onClick={event => {
                        event.preventDefault();
                        const name = document.getElementById("name").value;
                        const quantity = document.getElementById('quantity').value;
                        if(/^[A-Za-z]+$/.test(name)===false ||  /^\d+$/.test(quantity)===false ){
                            alert('podano złe dane');
                            return;
                        }
                        const indexOfProduct = this.state.fridge.findIndex(item => item.name.ignoreCase === name.ignoreCase);
                        console.log(indexOfProduct);
                        if(indexOfProduct===-1){
                            this.setState({
                                fridge: [...this.state.fridge, {name:name,quantity:Number.parseInt(quantity)}]
                            });}
                        else {
                            this.state.fridge[indexOfProduct].quantity+=Number.parseInt(quantity);
                            this.forceUpdate()
                        }
                        document.getElementById('name').value="";
                        document.getElementById('quantity').value="";
                        // console.log(this.state.fridge.length);
                    }
                    } className="productWrapper__button"
                    >Dodaj produkt
                    </button>
                </div>
            </form>
            <ul>
                {
                    this.state.fridge.map(
                        (product, index) => (
                            <ProductItem key={index} {...product}/>
                        )
                    )
                }
            </ul>
        </>)
    };
}

export default ProductWrapper;