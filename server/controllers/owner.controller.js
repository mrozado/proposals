import Owner from '../models/owner';
import cuid from 'cuid';
import slug from 'limax';
import sanitizeHtml from 'sanitize-html';

/**
 * Get all posts
 * @param req
 * @param res
 * @returns void
 */
export function getOwners(req, res) {
  Owner.find().sort('-dateAdded').exec((err, owners) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ owners });
  });
}

/**
 * Save a post
 * @param req
 * @param res
 * @returns void
 */
export function addOwner(req, res) {
  if (!req.body.owner.name || !req.body.owner.jobPosition || !req.body.owner.availability) {
    res.status(403).end();
  }

  const newOwner = new Owner(req.body.owner);

  // Let's sanitize inputs
  newOwner.jobPosition = sanitizeHtml(newOwner.title);
  newOwner.name = sanitizeHtml(newOwner.name);

  newOwner.slug = slug(newOwner.title.toLowerCase(), { lowercase: true });
  newOwner.cuid = cuid();
  newOwner.save((err, saved) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ post: saved });
  });
}

/**
 * Get a single post
 * @param req
 * @param res
 * @returns void
 */
export function getOwner(req, res) {
  Owner.findOne({ cuid: req.params.cuid }).exec((err, owners) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ owners });
  });
}

/**
 * Delete a post
 * @param req
 * @param res
 * @returns void
 */
export function deletePost(req, res) {
  Owner.findOne({ cuid: req.params.cuid }).exec((err, owners) => {
    if (err) {
      res.status(500).send(err);
    }

    owners.remove(() => {
      res.status(200).end();
    });
  });
}
