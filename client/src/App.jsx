import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import $ from 'jquery';
import _ from 'underscore';

import Header from './components/Product Detail/Header';
import ProductDetail from './components/Product Detail/Main';
import RelatedItems from './components/Related Items/Main';
import QuestionsAnswers from './components/Questions Answers/Main';
import Reviews from './components/Reviews/Main';
import withTracker from './Interactions';

const HeaderTracker = withTracker(Header, 'Header');
const ProductDetailTracker = withTracker(ProductDetail, 'Product Detail');
const RelatedItemsTracker = withTracker(RelatedItems, 'Related Items');
const QuestionsAnswersTracker = withTracker(QuestionsAnswers, 'Questions and Answers');
const ReviewsTracker = withTracker(Reviews, 'Reviews');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productId: '16060',
      product: null,
<<<<<<< HEAD
      productIds:[],
      products: [],
      stylesData: [],
      rating: null,
      ratings: [],
      relatedProductsData:[],
      relatedProducts: [],
      isDark:false,
=======
      isDark: false,
>>>>>>> Implemented sort dropdown  radio buttons. rebase commit
    };
    this.changeProductId = this.changeProductId.bind(this);
    this.getProduct = this.getProduct.bind(this);
    this.getStyles =this.getStyles.bind(this)
    this.changeMode = this.changeMode.bind(this);
    this.getRelatedProducts = this.getRelatedProducts.bind(this);
  }

  componentDidMount() {
    this.changeProductId(this.state.productId);
  }

  getProduct(id) {
    return axios.get(`/api/products/${id}`)
  }

  getStyles(id) {
    return axios.get(`/api/products/${id}/styles`)
  }
  getRating(id){
    return axios.get(`/api/reviews/meta/${id}`)
    .then((response) => {
      let count = 0;
      let total = 0;
      for(let rating in response.data.ratings){
        count += Number(response.data.ratings[rating]);
        total += Number(rating)*Number(response.data.ratings[rating])
      }
      return {rating: (Math.round(total/count * 4) / 4).toFixed(2)};
    })
    .catch(err=>console.error(err))
  }

  getRelatedProducts(id) {
    let relatedProducts= [];
    let newIds =[];
    let newRatings=[];
    let newProducts=[];
    let newStyles=[];
    let promises=[];
    return axios.get(`/api/products/${id}/related`)
      .then((response) => {
        relatedProducts =response.data.map(id => (String(id)))
        response.data.forEach((relatedProduct) => {
          if(this.state.productIds.indexOf(String(relatedProduct)) === -1 && newIds.indexOf(String(relatedProduct)) === -1) {
            newIds.push(String(relatedProduct));
            promises.push(this.getRating(relatedProduct))
            promises.push(this.getProduct(relatedProduct))
            promises.push(this.getStyles(relatedProduct))
          }
        })
      })
      .then(()=>{
        return axios.all(promises)
        .then(axios.spread((...responses) => {
          responses.forEach((response, i) => {
            if(response.rating) {
              newRatings.push(response.rating);
            } else if (response.data.results) {
              newStyles.push(response.data)
            } else if (response.data.description) {
              newProducts.push(response.data)
            }
          })
          return {newIds, newRatings, newProducts, newStyles, relatedProducts}
        }))
        .catch(err => console.error(err))
      })

  }

  changeProductId(id) {
    let ind = this.state.productIds.indexOf(id)
    let product;
    let styles;
    let rating;
    let relatedProducts= [];
    let newIds =[];
    let newRatings=[];
    let newProducts=[];
    let newStyles=[];
    if(ind !== -1){
      this.setState({
        productId: id,
        product: this.state.products[ind],
        rating: this.state.ratings[ind],
        relatedProducts: this.state.relatedProductsData[ind]
      })
    } else {
      newIds.push(id)
      return this.getProduct(id)
        .then((response) => {
          product = response.data;
          newProducts.push(product);
        })
        .then(()=>{
          return this.getStyles(id)
        })
        .then((response) => {
          styles= response.data;
          newStyles.push(styles);
        })
        .then(()=> { return this.getRating(id)})
        .then((response) => {
          rating= response.rating;
          newRatings.push(rating);
        })
        .then(() => (this.getRelatedProducts(id)))
        .then(data => {
          newIds = newIds.concat(data.newIds)

          newRatings = newRatings.concat(data.newRatings);
          newProducts = newProducts.concat(data.newProducts);
          newStyles = newStyles.concat(data.newStyles);

          let products = this.state.products.concat(newProducts)
          let relatedData= products.filter(product => data.relatedProducts.includes(String(product.id)))
          let allStyles=this.state.stylesData.concat(newStyles)
          let allRatings =this.state.ratings.concat(newRatings)
          let allIds = this.state.productIds.concat(newIds)
          let found =[]


          relatedData.forEach(product => {
            if(!found.includes(String(product.id))){
              product.style = allStyles.filter((style)=> style.product_id === String(product.id))[0].results[0];
              product.rating = allRatings[allIds.indexOf(String(product.id))];
              found.push(String(product.id))
            }

          })
          relatedProducts = relatedData.filter(data=>data.rating !== undefined && data.id !== id)
        })
        .then(() => {

          this.setState({
            productId: id,
            product: product,
            productIds: this.state.productIds.concat([id]),
            products: this.state.products.concat([product]),
            stylesData: this.state.stylesData.concat([styles]),
            ratings: this.state.ratings.concat([rating]),
            rating: rating,
            relatedProductsData: this.state.relatedProductsData.concat([relatedProducts]),
            relatedProducts: relatedProducts,
          });
        })
        .catch((err) => console.error(err));
    }
  }

  changeMode(e) {
    if (e.target.innerText === 'Dark') {
      document.body.classList.add('dark-scheme');
    } else {
      document.body.classList.remove('dark-scheme');
    }
    this.setState({ isDark: e.target.innerText === 'Dark' });
  }

  render() {
    const { productId, product, isDark } = this.state;
<<<<<<< HEAD
    if(this.state.stylesData.length){
      return (
        <div>
            <React.Fragment>
              <Header
                isDark={isDark}
                changeMode={this.changeMode}
              />
              <ProductDetailTracker
                productId={productId}
                product={product}
                styles={this.state.stylesData.filter((style)=> style.product_id === String(this.state.productId))[0].results}
                isDark={isDark}
                rating={this.state.rating}
              />
              <RelatedItemsTracker
                productId={productId}
                product={product}
                changeProductId={this.changeProductId}
                relatedProducts={this.state.relatedProducts}
                isDark={isDark}
              />
              <QuestionsAnswersTracker
                productId={productId}
                isDark={isDark}
              />
              <ReviewsTracker
                productId={productId}
                product={product}
                isDark={isDark}
              />
            </React.Fragment>
        </div>
      );
    } else {
      return(<div></div>)
    }
=======

    return (
      <div>
        <Header
          isDark={isDark}
          changeMode={this.changeMode}
        />
        <ProductDetailTracker
          productId={productId}
          product={product}
          isDark={isDark}
        />
        <RelatedItemsTracker
          productId={productId}
          product={product}
          changeProductId={this.changeProductId}
          isDark={isDark}
        />
        <QuestionsAnswersTracker
          productId={productId}
          isDark={isDark}
        />
        <ReviewsTracker
          productId={productId}
          product={product}
          isDark={isDark}
        />
        <Header />
        <ProductDetailTracker
          productId={productId}
          product={product}
        />
        <RelatedItemsTracker
          productId={productId}
          product={product}
          changeProductId={this.changeProductId}
        />
        <QuestionsAnswersTracker
          productId={productId}
        />
        <ReviewsTracker
          productId={productId}
          product={product}
        />
      </div>
    );
>>>>>>> implements review list and review tile in text
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
