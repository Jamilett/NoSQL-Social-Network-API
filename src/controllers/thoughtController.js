var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const { Thought, User } = require('../models');
const thoughtController = {
    getThoughts: (req, res) => __awaiter(this, void 0, void 0, function* () {
        try {
            const thoughts = yield Thought.find();
            res.json(thoughts);
        }
        catch (err) {
            res.status(500).json(err);
        }
    }),
    getThoughtById: (req, res) => __awaiter(this, void 0, void 0, function* () {
        try {
            const thought = yield Thought.findById(req.params.id);
            if (!thought) {
                return res.status(404).json({ message: 'Pensamiento no encontrado' });
            }
            res.json(thought);
        }
        catch (err) {
            res.status(500).json(err);
        }
    }),
    createThought: (req, res) => __awaiter(this, void 0, void 0, function* () {
        try {
            const thought = yield Thought.create(req.body);
            yield User.findByIdAndUpdate(req.body.userId, { $push: { thoughts: thought._id } }, { new: true });
            res.json(thought);
        }
        catch (err) {
            res.status(500).json(err);
        }
    }),
    updateThought: (req, res) => __awaiter(this, void 0, void 0, function* () {
        try {
            const thought = yield Thought.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
            if (!thought) {
                return res.status(404).json({ message: 'Pensamiento no encontrado' });
            }
            res.json(thought);
        }
        catch (err) {
            res.status(500).json(err);
        }
    }),
    deleteThought: (req, res) => __awaiter(this, void 0, void 0, function* () {
        try {
            const thought = yield Thought.findByIdAndDelete(req.params.id);
            if (!thought) {
                return res.status(404).json({ message: 'Pensamiento no encontrado' });
            }
            res.json({ message: 'Pensamiento eliminado correctamente' });
        }
        catch (err) {
            res.status(500).json(err);
        }
    }),
    addReaction: (req, res) => __awaiter(this, void 0, void 0, function* () {
        try {
            const thought = yield Thought.findByIdAndUpdate(req.params.thoughtId, { $push: { reactions: req.body } }, { new: true, runValidators: true });
            if (!thought) {
                return res.status(404).json({ message: 'Pensamiento no encontrado' });
            }
            res.json(thought);
        }
        catch (err) {
            res.status(500).json(err);
        }
    }),
    deleteReaction: (req, res) => __awaiter(this, void 0, void 0, function* () {
        try {
            const thought = yield Thought.findByIdAndUpdate(req.params.thoughtId, { $pull: { reactions: { reactionId: req.params.reactionId } } }, { new: true });
            if (!thought) {
                return res.status(404).json({ message: 'Pensamiento no encontrado' });
            }
            res.json(thought);
        }
        catch (err) {
            res.status(500).json(err);
        }
    })
};
module.exports = thoughtController;
