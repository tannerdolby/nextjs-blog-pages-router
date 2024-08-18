export default function handler(req, res) {
    const email = req.body.email;
    const feedback = req.body.feedback;

    // Do something with the form submission,
    // For example save user feedback to database etc
    /* db.collection.insert({
        email: email,
        feedback: feedback
    });
    */

    res.status(200).json({text: 'Saved user feedback to database'});
}