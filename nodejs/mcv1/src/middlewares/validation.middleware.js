import { body , validationResult } from "express-validator";

const validateMiddleware = async (req, res, next) => {

// const { name, price, imageUrl } = req.body;
        // let errors = [];
        // if (!name || name.trim() == ''){
        //     errors.push('Name is required');
        // }
        // if (!price || parseFloat(price) < 1){
        //     errors.push('Price must be positive value.');
        // }
        // try {
        //     const validUrl = new URL(imageUrl);
        // } catch(err){
        //     errors.push('URL is invalid');
        // }

        // using express validator 
        // step 1 setup rules for validator
        const rules = [ 
            body('name').notEmpty().withMessage('Name is Required'),
            body('price').isFloat({gt:1}).withMessage('price should be positive value'),
            // body('imageUrl').isURL().withMessage('Invalid URL')
        ];
        // run those rules 
        await Promise.all(
            rules.map((rule) => rule.run(req))
        )
        // checking errors after running
        var validationErrors = validationResult(req);


        if (!validationErrors.isEmpty()) {
            const errors = validationErrors.array();
            return res.render('new-product',{errorMessage:errors[0].msg,});
        }
        next();
}

export default validateMiddleware;