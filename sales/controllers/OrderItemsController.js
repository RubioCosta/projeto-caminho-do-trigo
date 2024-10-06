module.exports = class OrderItemsController {
    
    static async createOrderItem(req, res) {
        const { idProduct } = req.body;

        try {            

        } catch(e) {
            console.log(e);
            res.status(500).json({message: 'Internal server error'});
        }
    }

};