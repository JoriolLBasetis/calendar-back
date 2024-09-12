const { response } = require('express');
const Event = require('../models/Event');


const getEvents = async (req, res = response) => {
    const events = await Event.find().populate('user', 'name');
    res.json({
        ok: true, events, msg: 'getEvents'
    })
}
const createEvent = async (req, res = response) => {
    console.log(req.body)
    const event = new Event(req.body);
    try {
        event.user = req.uid;
        await event.save();
        return res.json({
            ok: true,
            event,
            msg: 'createEvent'
        })

    } catch (everr) {
        console.log(everr);
        return res.status(500).json({
            ok: false,
            msg: 'error createEvent'
        })
    }
    res.json({
        ok: true,
        msg: 'createEvent'
    })
}
const editEvents = async (req, res = response) => {
    const eid = req.params.id;
    console.log(req.params);
    try {
        const event = await Event.findById(eid)
        if (!event) {
            return res.status(404).json({
                ok: false,
                msg: 'event no existeix'
            })
        }

        if (req.uid !== event.user.toString()) {
            return res.status(401).json({
                ok: false,
                msg: 'event no permisos'
            })
        }

        const nEvent = {
            ...req.body,
            user: req.uid
        }

        const eventActualitzat = await Event.findByIdAndUpdate(eid, nEvent, { new: true })

        res.json({
            ok: true,
            eventActualitzat,
            msg: 'editEvents'
        })

    } catch (error) {
        return res.status(500).json({
            ok: false,
            error,
            msg: 'error editEvent'
        })
    }


}
const deleteEvent = async (req, res = response) => {
    const eid = req.params.id;
    console.log(req.params);
    try {
        const event = await Event.findById(eid)
        if (!event) {
            return res.status(404).json({
                ok: false,
                msg: 'event no existeix'
            })
        }

        if (req.uid !== event.user.toString()) {
            return res.status(401).json({
                ok: false,
                msg: 'event no permisos'
            })
        }


        await Event.findByIdAndDelete(eid)

        res.json({
            ok: true,
            msg: 'deleteEvent'
        })

    } catch (error) {
        return res.status(500).json({
            ok: false,
            error,
            msg: 'error deleteEvent'
        })
    }
    res.json({
        ok: true,
        msg: 'deleteEvent'
    })
}
module.exports = { getEvents, createEvent, deleteEvent, editEvents }