const User = require('../models/userModel');

module.exports = async function loadSupervisions(userId, res){
    await User.findById(userId)
        .populate('supervisions')
        .then((user) => {
            if(!user){
                return res.status(400).json({
                    status: 'error',
                    error: 'Supervisor not in DB',
                });
            }
            res.status(200).json({
                status: 'succes',
                data: user.supervisions.map((d) => {
                    return({
                        fullName: d.fullName,
                        userId: d._id
                    })
                }),
              })
        })
        .catch(err => console.log('Error fetching data in loadSupervisions', err));    
}
