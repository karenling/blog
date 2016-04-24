#encoding: UTF-8

xml.instruct! :xml, :version => "1.0"
xml.rss :version => "2.0" do
  xml.channel do
    xml.title 'Twinkie and Karen'
    xml.author "Karen Ling"
    xml.description "Personal, Twinkie, Dog, Engineering, Photography"
    xml.link root_url
    xml.language "en"

    for post in @posts
      xml.item do
        xml.title post.title
        xml.author 'Karen Ling'
        xml.pubDate post.created_at.to_s(:rfc822)
        xml.link post_url(post)
        xml.guid post.id
        xml.description post.humanized_body_truncated + ' ' + link_to('Read Full Post', post_url(post))
        xml.copyright copyright_text

      end
    end
  end
end
