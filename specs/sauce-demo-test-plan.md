# Sauce Demo Storefront Test Plan

## Application Overview

Comprehensive functional test plan for https://sauce-demo.myshopify.com/, covering storefront navigation, catalog and product availability, search, cart and checkout entry, customer account forms, blog/about content, and Sauce wishlist/referral links. All scenarios are independent and begin in a fresh browser context with no authenticated customer and an empty cart. Use test-only data; do not complete or pay for an order. Hosted checkout, customer registration, and third-party integrations may depend on external Shopify services.

## Test Scenarios

### 1. Storefront and Catalog

**Seed:** `tests/seed.spec.ts`

#### 1.1. Load the home page and follow primary navigation

**File:** `tests/storefront/home-navigation.spec.ts`

**Steps:**
  1. Start a fresh browser context and open https://sauce-demo.myshopify.com/.
    - expect: The page loads with the Sauce Demo title and store heading.
    - expect: The header shows search, Log In, Sign up, My Cart (0), and Check Out.
    - expect: The main navigation exposes Home, Catalog, Blog, About Us, Wish list, and Refer a friend.
  2. Select Catalog, then use the home/store logo link to return to the home page.
    - expect: Catalog opens /collections/all and the logo returns to /.
    - expect: Each navigation action loads the intended page without an error page.

#### 1.2. Browse all products and verify listing data

**File:** `tests/storefront/catalog-products.spec.ts`

**Steps:**
  1. Start a fresh browser context and open /collections/all.
    - expect: The Products collection is displayed.
    - expect: Seven product entries are shown: Black heels (£45.00), Bronze sandals (£39.99), Brown Shades (£20.00), Grey jacket (£55.00), Noir jacket (£60.00), Striped top (£50.00), and White sandals (£25.00).
    - expect: Brown Shades and White sandals are visibly marked Sold Out; available products are not marked sold out.
  2. Open the Grey jacket product from the listing, then use the breadcrumb or Catalog navigation to return.
    - expect: The selected product detail page opens and the return navigation goes back to the collection.
    - expect: Product names, prices, and availability indicators remain consistent between listing and detail pages.

#### 1.3. Read a product detail page

**File:** `tests/storefront/product-detail.spec.ts`

**Steps:**
  1. Start a fresh browser context and open /products/grey-jacket.
    - expect: The page identifies Grey jacket and displays £55.00.
    - expect: The product image and description area are rendered.
    - expect: The product selector, if displayed, contains the available Grey jacket option selected by default.
    - expect: An enabled Add to Cart button is present.
  2. Open /products/brown-shades.
    - expect: Brown Shades and £20.00 are displayed.
    - expect: The purchase action is disabled and labeled Sold Out.

#### 1.4. Read the news article

**File:** `tests/storefront/blog-navigation.spec.ts`

**Steps:**
  1. Start a fresh browser context and open /blogs/news.
    - expect: The News page displays the First Post article and its date/author information.
    - expect: The article title is a navigable link.
  2. Open First Post and follow the breadcrumb or Blog navigation back to the news listing.
    - expect: The article detail page loads with its article content.
    - expect: The return navigation opens the news listing.

#### 1.5. Read the About Us page

**File:** `tests/storefront/about-page.spec.ts`

**Steps:**
  1. Start a fresh browser context and open /pages/about-us.
    - expect: The page heading is About Us and the page contains the Sauce Demo description.
    - expect: The Sauce link and shared header/footer navigation are visible and usable.

### 2. Search

**Seed:** `tests/seed.spec.ts`

#### 2.1. Search for an existing product

**File:** `tests/search/product-search.spec.ts`

**Steps:**
  1. Start a fresh browser context, open the home page, enter Grey jacket in the header Search field, and submit.
    - expect: Search results identify Grey jacket and show the matching product link and £55.00 price.
    - expect: Opening the result navigates to the Grey jacket product detail page.

#### 2.2. Show a useful empty state for unmatched search

**File:** `tests/search/no-results.spec.ts`

**Steps:**
  1. Start a fresh browser context, submit a distinctive query that does not match any product, such as no-such-product-8472.
    - expect: The search results page indicates that no products matched the query.
    - expect: No unrelated product is presented as a matching result, and the user can start another search.

#### 2.3. Handle an empty search request

**File:** `tests/search/empty-search.spec.ts`

**Steps:**
  1. Start a fresh browser context and open /search without a query.
    - expect: The page displays the Search Results heading and a clear no-search-performed message or equivalent empty-search state.
    - expect: The user can navigate back to the homepage or submit a new search.

### 3. Product, Cart, and Checkout

**Seed:** `tests/seed.spec.ts`

#### 3.1. Add one available product to the cart

**File:** `tests/cart/add-product.spec.ts`

**Steps:**
  1. Start a fresh browser context with an empty cart and open /products/grey-jacket.
    - expect: The cart count starts at zero.
  2. Select Add to Cart once and open /cart.
    - expect: The header cart count becomes one.
    - expect: The cart contains Grey jacket at £55.00 with quantity 1 and a £55.00 line total.
    - expect: The order total is £55.00.

#### 3.2. Add multiple units and verify cart totals

**File:** `tests/cart/multiple-quantity.spec.ts`

**Steps:**
  1. Start a fresh browser context with an empty cart and add Grey jacket twice from its product page.
    - expect: The cart count represents two units, whether displayed as one quantity-2 line or two equivalent units.
  2. Open /cart and inspect the line items and total.
    - expect: The cart accounts for exactly two Grey jackets.
    - expect: The line and order totals equal £110.00, with no unexpected extra item.

#### 3.3. Update cart quantity and order note

**File:** `tests/cart/update-cart.spec.ts`

**Steps:**
  1. Start a fresh browser context, add one Grey jacket, and open /cart.
    - expect: The cart shows one Grey jacket at £55.00 and quantity 1.
  2. Change the quantity to 2, enter a short order note, and select Update.
    - expect: The quantity remains 2 after the update.
    - expect: The line total and order total recalculate to £110.00.
    - expect: The entered order note remains present after the update.

#### 3.4. Remove the last cart item

**File:** `tests/cart/remove-item.spec.ts`

**Steps:**
  1. Start a fresh browser context, add one Grey jacket, and open /cart.
    - expect: The cart contains the product and provides a remove control.
  2. Remove the Grey jacket.
    - expect: The cart becomes empty and the header cart count returns to zero.
    - expect: The empty-cart state is understandable and provides a Continue Shopping path back to the catalog.

#### 3.5. Prevent purchase of sold-out products

**File:** `tests/cart/sold-out-prevention.spec.ts`

**Steps:**
  1. Start a fresh browser context and open the Brown Shades detail page.
    - expect: The Sold Out control is disabled and cannot add the product to the cart.
  2. Open the White sandals detail page and check its availability control.
    - expect: White sandals is also unavailable for purchase.
    - expect: Neither sold-out product changes the cart count or adds a line item.

#### 3.6. Enter hosted checkout with the correct cart

**File:** `tests/cart/checkout-entry.spec.ts`

**Steps:**
  1. Start a fresh browser context, add one available Grey jacket, open /cart, and select Check Out.
    - expect: The hosted checkout opens or the storefront reports a clear checkout availability error.
    - expect: When checkout loads, the order includes one Grey jacket and the expected £55.00 merchandise subtotal.
    - expect: Checkout entry does not silently clear or duplicate the cart.
  2. Stop at the checkout review/contact-information stage without entering real payment details or placing an order.
    - expect: No order is submitted and no payment is captured.

### 4. Customer Accounts

**Seed:** `tests/seed.spec.ts`

#### 4.1. Validate required registration fields

**File:** `tests/accounts/registration-required-fields.spec.ts`

**Steps:**
  1. Start a fresh browser context and open /account/register.
    - expect: The Create Account form contains First Name, Last Name, Email Address, and Password fields and a Create button.
  2. Submit the form with all fields empty.
    - expect: Required fields are identified by browser or page validation.
    - expect: The form does not create an account or navigate to an authenticated account page.

#### 4.2. Reject malformed registration email

**File:** `tests/accounts/registration-email-validation.spec.ts`

**Steps:**
  1. Start a fresh browser context and open /account/register.
    - expect: The registration form is available.
  2. Enter test names, a malformed email address, and a test-only password; submit the form.
    - expect: The malformed email is rejected with clear validation feedback.
    - expect: No account is created and the entered values are not silently accepted as a successful registration.

#### 4.3. Reject invalid login credentials

**File:** `tests/accounts/login-invalid-credentials.spec.ts`

**Steps:**
  1. Start a fresh browser context and open /account/login.
    - expect: The Customer Login form contains Email Address and Password fields, a Sign In button, and a password-recovery link.
  2. Submit a syntactically valid test email with an incorrect test-only password.
    - expect: The user remains unauthenticated and receives clear failure feedback.
    - expect: The login form remains available for correction or retry.

#### 4.4. Open password recovery

**File:** `tests/accounts/password-recovery.spec.ts`

**Steps:**
  1. Start a fresh browser context and open /account/login.
    - expect: The Forgot your password? link is visible.
  2. Select Forgot your password?.
    - expect: A password-recovery form or clearly identified recovery interaction is presented.
    - expect: The customer can return to login without being unexpectedly authenticated.

### 5. Sauce Features and Shared UI

**Seed:** `tests/seed.spec.ts`

#### 5.1. Activate the wishlist entry point

**File:** `tests/sauce-features/wishlist.spec.ts`

**Steps:**
  1. Start a fresh browser context on the storefront and select Wish list in the primary navigation.
    - expect: The wishlist interaction opens or reveals its intended wishlist experience, rather than only changing the URL fragment.
    - expect: Any empty wishlist state is understandable and the user can close or leave the experience.

#### 5.2. Activate the referral entry point

**File:** `tests/sauce-features/referral.spec.ts`

**Steps:**
  1. Start a fresh browser context on the storefront and select Refer a friend in the primary navigation.
    - expect: The referral interaction opens or reveals its intended referral experience, rather than only changing the URL fragment.
    - expect: Any share or referral instructions are usable, and the user can close or leave the experience.

#### 5.3. Verify shared footer and navigation on key pages

**File:** `tests/storefront/shared-shell.spec.ts`

**Steps:**
  1. Start a fresh browser context and visit the home page, catalog, product detail, search, and cart pages.
    - expect: Each page retains working primary navigation and footer links to Search and About Us.
    - expect: The footer displays accepted payment methods with appropriate accessible labels.
    - expect: Navigation targets load the corresponding page and do not unexpectedly modify cart contents.
