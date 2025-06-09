import Automation from '../models/automation.js';
import automationSchema from '../validation/automationSchema.js';
import Action from '../models/action.js';
import Trigger from '../models/trigger.js';
import PlatformIntegration from '../models/platformIntegration.js';




export const createAutomation = async (req, res) => {
  try {
    
    const { error, value } = automationSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        status: false,
        message: 'Validation error',
        details: error.details[0].message
      });
    }

    const { id, name } = value;

    let automation = null;

  
    if (id) {
      automation = await Automation.findByPk(id);
    } else if (name) {
      automation = await Automation.findOne({ where: { name } });
    }

    if (automation) {
      await automation.update(value);
      return res.status(200).json({
        status: true,
        message: 'Automation updated successfully',
        data: automation,
      });
    }

    const newAutomation = await Automation.create(value);
    return res.status(201).json({
      status: true,
      message: 'Automation created successfully',
      data: newAutomation,
    });

  } catch (err) {
    console.error('Error in createAutomation:', err);
    return res.status(500).json({
      status: false,
      message: 'Internal server error',
      details: err.message,
    });
  }
};


export const getAndFilter = async (req, res) => {
  try {
    const { status, limit, page } = req.body;
    const where = {};

  
    if (status === 'Active') {
      where.isActive = true;
    } else if (status === 'Paused') {
      where.isActive = false;
    }

    const options = {
      where,
      order: [['createdAt', 'DESC']]
    };

    if (limit && page) {
      const parsedLimit = parseInt(limit);
      const parsedPage = parseInt(page);
      options.limit = parsedLimit;
      options.offset = (parsedPage - 1) * parsedLimit;

      const { rows, count } = await Automation.findAndCountAll(options);
      return res.json({
        status: true,
        data: rows,
        total: count,
        currentPage: parsedPage,
        totalPages: Math.ceil(count / parsedLimit)
      });
    }

    const data = await Automation.findAll(options);
    return res.json({ status: true, data });

  } catch (err) {
    console.error('Error in getAndFilter:', err);
    res.status(500).json({
      status: false,
      message: 'Internal server error',
      details: err.message,
    });
  }
};



export const getAutomationById = async (req, res) => {
  try {
    const automation = await Automation.findByPk(req.params.id);
    if (!automation) {
      return res.status(404).json({
        status: false,
        message: 'Automation not found'
      });
    }

    res.json({
      status: true,
      data: automation
    });

  } catch (err) {
    console.error('Error in getAutomationById:', err);
    res.status(500).json({
      status: false,
      message: 'Internal server error',
      details: err.message,
    });
  }
};


export const deleteAutomation = async (req, res) => {
  try {
    const automation = await Automation.findByPk(req.params.id);
    if (!automation) {
      return res.status(404).json({
        status: false,
        message: 'Automation not found'
      });
    }

    await automation.destroy();
    res.json({
      status: true,
      message: 'Automation deleted successfully'
    });

  } catch (err) {
    console.error('Error in deleteAutomation:', err);
    res.status(500).json({
      status: false,
      message: 'Internal server error',
      details: err.message,
    });
  }
};




export const getDropdownOptions = async (req, res) => {
  try {
    const { type, userId } = req.body;

    if (!userId) {
      return res.status(400).json({
        status: false,
        message: 'userId is required'
      });
    }

    
    const typeKey = type?.toLowerCase();

     
    const validTypes = {
      action: Action,
      trigger: Trigger,
      platform: PlatformIntegration
    };

    const model = validTypes[typeKey];

    if (!model) {
      return res.status(400).json({
        status: false,
        message: 'Invalid type. Must be one of: action, trigger, platform'
      });
    }

    const options = await model.findAll({
      where: { userId },
      attributes: ['id', 'name'],
      order: [['name', 'ASC']]
    });
    
    if (options.length === 0) {
      return res.status(200).json({
        status: true,
        message: 'No options found for this user and type',
        data: []
      });
    }

    return res.status(200).json({
      status: true,
      data: options
    });

  } catch (err) {
    console.error('Error in getDropdownOptions:', err);
    res.status(500).json({
      status: false,
      message: 'Internal server error',
      details: err.message,
    });
  }
};



export const addDropdownOption = async (req, res) => {
  try {
    const { type, name, userId } = req.body;

    if (!type || !name || !userId) {
      return res.status(400).json({ status: false, message: 'type, name, and userId are required.' });
    }

    let result;
    switch (type.toLowerCase()) {
      case 'action':
        result = await Action.create({ name, userId });
        break;
      case 'trigger':
        result = await Trigger.create({ name, userId });
        break;
      case 'platformintegration':
        result = await PlatformIntegration.create({ name, userId });
        break;
      default:
        return res.status(400).json({ status: false, message: 'Invalid type provided.' });
    }

    res.status(201).json({
      status: true,
      message: `${type} added successfully`,
      data: result
    });
  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
};



