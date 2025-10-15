import Contact from "../models/ContactModel.js";

export default {
  index: (req, res) => {
    res.render("contact", { contact: {} });
  },

  create: async (req, res) => {
    try {
      const contact = new Contact(req.body);
      await contact.create();

      if (contact.errors.length > 0) {
        req.flash("errors", contact.errors);
        req.session.save(() => {
          return res.redirect("/contact");
        });
        return;
      }

      req.flash("success", "Contato registrado com sucesso.");
      req.session.save(() => {
        return res.redirect(`/contact/${contact.contact._id}`);
      });
    } catch (e) {
      console.log(e);
      return res.render("404");
    }
  },

  editIndex: async (req, res) => {
    if (!req.params.id) return res.render("404");
    const contact = await Contact.searchById(req.params.id);
    if (!contact) return res.render("404");
    res.render("contact", { contact });
  },

  edit: async (req, res) => {
    try {
      if (!req.params.id) return res.render("404");
      const contact = new Contact(req.body);
      await contact.update(req.params.id);

      if (contact.errors.length > 0) {
        req.flash("errors", contact.errors);
        req.session.save(() => {
          return res.redirect(`/contact/${req.params.id}`);
        });
        return;
      }

      req.flash("success", "Contato editado com sucesso.");
      req.session.save(() => {
        return res.redirect(`/contact/${contact.contact._id}`);
      });
    } catch (e) {
      console.log(e);
      res.render("404");
    }
  },

  delete: async (req, res) => {
    if (!req.params.id) return res.render("404");
    const contact = await Contact.delete(req.params.id);
    if (!contact) return res.render("404");

    req.flash("success", "Contato apagado com sucesso.");
    req.session.save(() => {
      return res.redirect("/");
    });
  },
};
